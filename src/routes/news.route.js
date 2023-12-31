import { Router } from "express";
import {
  create,
  findAll,
  findById,
  findBySection,
  topNews,
  searchByTitle,
  byUser,
  update,
  deleteById,
  likeNews,
  addComment,
  removeComment,
} from "./../controllers/news.controller.js";
import {
  checkExtraFields,
  validId,
  validNews,
  checkOwnerPost,
} from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import News from "../models/News.js";

const newsCheckExtraFields = checkExtraFields(News);

const newsRoute = Router();

newsRoute.post("/", authMiddleware, newsCheckExtraFields, create);
newsRoute.get("/", findAll);
newsRoute.get("/top", topNews);
newsRoute.get("/search", searchByTitle);
newsRoute.get("/byUser", authMiddleware, byUser);
newsRoute.get("/posts", findBySection);
newsRoute.get("/:id", authMiddleware, validId, validNews, findById);
newsRoute.patch("/:id", authMiddleware, checkOwnerPost, update);
newsRoute.delete("/:id", authMiddleware, checkOwnerPost, deleteById);
newsRoute.patch("/like/:id", authMiddleware, likeNews);
newsRoute.patch("/comment/:id", authMiddleware, addComment);
newsRoute.patch("/comment/:idNews/:idComment", authMiddleware, removeComment);

export default newsRoute;