import { Router } from "express";
import { create, findAll, findById, deleteById, update } from "./../controllers/user.controller.js";
import { validId, validUser, checkExtraFields, lowerCases, validEmail, userExist, checkPassword } from "../middlewares/global.middlewares.js";
import User from "../models/User.js";

const userCheckExtraFields = checkExtraFields(User);
const userRoute = Router();

userRoute.post("/", lowerCases, validEmail, checkPassword, userCheckExtraFields, userExist, create);
userRoute.get("/", findAll);
userRoute.get("/:id", validId, validUser, findById);
userRoute.delete("/:id", validId, validUser, deleteById);
userRoute.patch("/:id", lowerCases, validEmail, checkPassword, userCheckExtraFields, userExist, validId, validUser, update);

export default userRoute;