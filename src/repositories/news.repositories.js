import News from "../models/News.js";

export const createRepository = (body) => News.create(body);
export const findAllRepository = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countNews = () => News.countDocuments();
export const topNewsRepository = () =>
  News.findOne().sort({ _id: -1 }).populate("user");
export const findByIdRepository = (id) => News.findById(id).populate("user");
export const searchByTitleRepository = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" }, // regex title ou parte desse title; option: "i" para não ser case-sensitive
  })
    .sort({ _id: -1 })
    .populate("user");

export const byUserRepository = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");

export const updateRepository = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

export const deleteByIdRepository = (id) => News.findOneAndDelete({ _id: id });

export const likeNewsRepository = (idNews, userId, userName) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, userName, createdAt: new Date() } } },
    { new: true }
  );

export const deleteLikeNewsRepository = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { likes: { userId } } },
    { new: true }
  );

export const addCommentRepository = (idNews, comment, userId, userName) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: {
          idComment,
          userId,
          userName,
          comment,
          createdAt: new Date(),
        },
      },
    },
    { new: true }
  );
};

export const removeCommentRepository = (idNews, idComment, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, userId } } },
    { new: true }
  );