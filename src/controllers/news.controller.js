import {
  createService,
  findAllService,
  topNewsService,
  searchByTitleService,
  byUserService,
  updateService,
  deleteByIdService,
  likeNewsService,
  addCommentService,
  removeCommentService,
  findByIdService,
} from "../services/news.service.js";

const create = async (req, res) => {
  try {
    req.body.userId = req.userId;

    await createService(req.body);

    res.status(201).send({ messege: "Post criado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const body = {
      limit: req.query.limit,
      offset: req.query.offset,
      baseUrl: req.baseUrl,
    };

    const news = await findAllService(body);

    res.status(200).send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const topNews = async (_, res) => {
  try {
    const news = await topNewsService();
    res.status(200).send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const news = await findByIdService(req.news);
    return res.status(200).send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchByTitleService(title);

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

const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserService(id);

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

const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const id = req.postId;

    if (!title && !text && !banner) {
      return res.status(400).send({
        message: "Por favor, preencha pelo menos um requisito do formulário!",
      });
    }

    await updateService(id, title, text, banner);

    return res
      .status(200)
      .send({ messege: "Postagem atualizada com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.postId;

    await deleteByIdService(id);

    return res.status(200).send({ messege: "Notícia deletada com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const likeNews = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const userName = req.userName;

  try {
    const newsLiked = await likeNewsService(id, userId, userName);

    if (!newsLiked) {
      await deleteLikeNewsService(id, userId);
      return res.status(200).send({ messege: "Like removido com sucesso!" });
    }

    res.status(200).send({ messege: "Like adicionado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, userName } = req;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ messege: "Escreva um comentário!" });
    }

    await addCommentService(id, comment, userId, userName);
    res.status(200).send("Comentário adicionado com sucesso!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const removeComment = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted = await removeCommentService(
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

export {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  deleteById,
  likeNews,
  addComment,
  removeComment,
};
