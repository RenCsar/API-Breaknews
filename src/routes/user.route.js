const route = require("express").Router();
const userController = require("./../controllers/user.controller");
const { validId, validUser, checkExtraFields, lowerCases, validEmail, userExist } = require("../middlewares/global.middlewares")

route.post("/", lowerCases, validEmail, checkExtraFields, userExist, userController.create);
route.get("/", userController.findAll);
route.get("/:id", validId, validUser, userController.findById);
route.delete("/:id", validId, validUser, userController.deleteById);
route.patch("/:id", lowerCases, validEmail, checkExtraFields, userExist, validId, validUser, userController.update)

module.exports = route;