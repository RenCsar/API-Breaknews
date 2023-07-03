import { Router } from "express";
import { create, findAll, findById, topNews, searchByTitle } from "./../controllers/news.controller.js";
import { checkExtraFields, validId, validNews } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import News from "../models/News.js";

const newsCheckExtraFields = checkExtraFields(News);

const newsRoute = Router();

newsRoute.post("/", authMiddleware, newsCheckExtraFields, create);
newsRoute.get("/", findAll);
newsRoute.get("/top", topNews);
newsRoute.get("/search", searchByTitle);
newsRoute.get("/:id", authMiddleware, validId, validNews, findById);

export default newsRoute;