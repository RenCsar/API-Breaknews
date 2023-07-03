import { Router } from "express";
import { create, findAll, findById, topNews } from "./../controllers/news.controller.js";
import { checkExtraFields } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import News from "../models/News.js";

const newsCheckExtraFields = checkExtraFields(News);

const newsRoute = Router();

newsRoute.post("/", authMiddleware, newsCheckExtraFields, create);
newsRoute.get("/", findAll);
newsRoute.get("/top", topNews);
newsRoute.get("/:id", findById);

export default newsRoute;