import { Router } from "express";
import { create, findAll, findById, deleteById, update } from "./../controllers/user.controller.js";
import { validId, validUser, checkExtraFields, lowerCases, validEmail, userExist } from "../middlewares/global.middlewares.js";

const userRoute = Router();

userRoute.post("/", lowerCases, validEmail, checkExtraFields, userExist, create);
userRoute.get("/", findAll);
userRoute.get("/:id", validId, validUser, findById);
userRoute.delete("/:id", validId, validUser, deleteById);
userRoute.patch("/:id", lowerCases, validEmail, checkExtraFields, userExist, validId, validUser, update)

export default userRoute;