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
  findCommentRepository,
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

export const searchByTitleService = async (title) => {
  try {
    const news = await searchByTitleRepository(title);

    if (news.length === 0)
      throw new Error("Não existe nenhuma notícia com esse título!");

    return {
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

export const byUserService = async (id) => {
  try {
    const news = await byUserRepository(id);

    return {
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

export const updateService = async (body) => {
  try {
    const { title, text, banner } = body;

    if (!title && !text && !banner)
      throw new Error(
        "Por favor, preencha pelo menos um requisito do formulário!"
      );

    return await updateRepository(body);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteByIdService = async (id) => {
  try {
    return await deleteByIdRepository(id);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const likeNewsService = async ({ idNews, userId, userName }) => {
  try {
    const newsLiked = await likeNewsRepository(idNews, userId, userName);

    if (!newsLiked) {
      await deleteLikeNewsRepository(idNews, userId);
      throw new Error("Like removido com sucesso!");
    }

    return newsLiked;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addCommentService = async (id, comment, userId, userName) => {
  try {
    if (!comment) throw new Error("Escreva um comentário!");

    return await addCommentRepository(id, comment, userId, userName);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const removeCommentService = async (idNews, idComment, userId) => {
  try {
    const findPost = await findCommentRepository(idNews, idComment, userId);

    if (!findPost) throw new Error("Notícia não encontrada!");

    const findComment = findPost.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!findComment) throw new Error("Comentário não encontrado!");

    if (String(findComment.userId) != String(userId))
      throw new Error("Você não pode deletar esse comentário!");

    return await removeCommentRepository(idNews, idComment, userId);
  } catch (err) {
    throw new Error(err.message);
  }
};