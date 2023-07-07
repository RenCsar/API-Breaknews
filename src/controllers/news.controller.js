import {
  createService,
  findAllService,
  countNews,
  topNewsService,
  searchByTitleService,
  byUserService,
  updateService,
  deleteByIdService,
  likeNewsService,
  deleteLikeNewsService,
} from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res.status(400).send({
        message: "Por favor, preencha todos os requisitos do formulário!",
      });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.status(201).send({ messege: "Post criado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const news = await findAllService(offset, limit);
    const total = await countNews();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previuos = offset - limit < 0 ? null : offset - limit;
    const previuosUrl =
      previuos != null
        ? `${currentUrl}?limit=${limit}&offset=${previuos}`
        : null;

    if (news.length === 0) {
      return res.status(400).send({ message: "Nenhuma postagem registrada!" });
    }

    res.status(200).send({
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
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const topNews = async (_, res) => {
  try {
    const news = await topNewsService();

    if (!news) {
      return res.status(400).send({ messege: "Não há nenhum post!" });
    }

    res.send({
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
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const news = req.news;

    return res.status(200).send({
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
    });
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
};