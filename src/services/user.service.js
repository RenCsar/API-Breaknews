const User = require("../models/User");

const createService = (body) => User.create(body);
const findAllService = () => User.find();
const findByIdService = (id) => User.findById(id);
const deleteByIdService = (id) => User.findByIdAndDelete(id);
const updateService = (id, name, username, email, password, img, background) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, img, background }
  );

module.exports = {
  createService,
  findAllService,
  findByIdService,
  deleteByIdService,
  updateService,
};