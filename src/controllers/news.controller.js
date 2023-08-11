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
  findBySectionService,
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

const findBySection = async (req, res) => {
  try {
    const body = {
      limit: req.query.limit,
      offset: req.query.offset,
      baseUrl: req.baseUrl,
      section: req.query.section.toLowerCase()
    };

    const news = await findBySectionService(body);

    return res.status(200).send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchByTitleService(title);

    return res.status(200).send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserService(id);

    return res.status(200).send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const body = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      text: req.body.text,
      category: req.body.category,
      banner: req.body.banner,
      postId: req.postId,
    };
    await updateService(body);

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
  const body = {
    idNews: req.params.id,
    userId: req.userId,
    userName: req.userName,
  };

  try {
    await likeNewsService(body);
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

    await removeCommentService(idNews, idComment, userId);

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
  findBySection,
  searchByTitle,
  byUser,
  update,
  deleteById,
  likeNews,
  addComment,
  removeComment,
};