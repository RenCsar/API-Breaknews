import {
  createRepository,
  findAllRepository,
  countNews,
  topNewsRepository,
  searchByTitleRepository,
  byUserRepository,
  updateRepository,
  deleteByIdRepository,
  likeNewsRepository,
  deleteLikeNewsRepository,
  addCommentRepository,
  removeCommentRepository,
} from "../repositories/news.repositories.js";

export const createService = async (body) => {
  try {
    const { title, text, banner, userId } = body;

    if (!title || !text || !banner)
      throw new Error("Por favor, preencha todos os requisitos do formulário!");

    return await createRepository({
      title,
      text,
      banner,
      user: userId,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const findAllService = async (body) => {
  try {
    let { limit, offset, baseUrl } = body;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const news = await findAllRepository(offset, limit);
    const total = await countNews();
    const currentUrl = baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previuos = offset - limit < 0 ? null : offset - limit;
    const previuosUrl =
      previuos != null
        ? `${currentUrl}?limit=${limit}&offset=${previuos}`
        : null;

    if (news.length === 0) throw new Error("Nenhuma postagem registrada!");

    return {
      nextUrl,
      previuosUrl,
      limit,
      offset,
      total,

      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        img: item.user.img,
      })),
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const topNewsService = async () => {
  try {
    const news = await topNewsRepository();

    if (!news) throw new Error("Não há nenhum post!");

    return {
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        img: news.user.img,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const findByIdService = async (body) => {
  try {
    const news = body;

    return {
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        img: news.user.img,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const searchByTitleService = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchByTitleRepository(title);

    if (news.length === 0) {
      return res
        .status(400)
        .send({ messege: "Não existe nenhuma notícia com esse título!" });
    }

    return res.status(200).send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        img: item.user.img,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const byUserService = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserRepository(id);

    return res.status(200).send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        img: item.user.img,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const id = req.postId;

    if (!title && !text && !banner) {
      return res.status(400).send({
        message: "Por favor, preencha pelo menos um requisito do formulário!",
      });
    }

    await updateRepository(id, title, text, banner);

    return res
      .status(200)
      .send({ messege: "Postagem atualizada com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteByIdService = async (req, res) => {
  try {
    const id = req.postId;

    await deleteByIdRepository(id);

    return res.status(200).send({ messege: "Notícia deletada com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const likeNewsService = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const userName = req.userName;

  try {
    const newsLiked = await likeNewsRepository(id, userId, userName);

    if (!newsLiked) {
      await deleteLikeNewsRepository(id, userId);
      return res.status(200).send({ messege: "Like removido com sucesso!" });
    }

    res.status(200).send({ messege: "Like adicionado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addCommentService = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, userName } = req;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ messege: "Escreva um comentário!" });
    }

    await addCommentRepository(id, comment, userId, userName);
    res.status(200).send("Comentário adicionado com sucesso!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const removeCommentService = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted = await removeCommentRepository(
      idNews,
      idComment,
      userId
    );

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentFinder) {
      return res.status(400).send({ messege: "Comentário não existe!" });
    }

    if (commentFinder.userId !== userId) {
      return res
        .status(400)
        .send({ messege: "Você não pode deletar esse comentário!" });
    }

    res.status(200).send("Comentário removido com sucesso!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
