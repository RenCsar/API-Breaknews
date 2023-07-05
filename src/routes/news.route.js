import { Router } from "express";
import {
  create,
  findAll,
  findById,
  topNews,
  searchByTitle,
  byUser,
  update,
  deleteById
} from "./../controllers/news.controller.js";
import {
  checkExtraFields,
  validId,
  validNews,
  checkOwnerPost
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
newsRoute.get("/:id", authMiddleware, validId, validNews, findById);
newsRoute.patch("/:id", authMiddleware, checkOwnerPost, update);
newsRoute.delete("/:id", authMiddleware, checkOwnerPost, deleteById);

export default newsRoute;