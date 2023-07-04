import User from "../models/User.js";

const createService = (body) => User.create(body);
const findAllService = () => User.find();
const findByIdService = (id) => User.findById(id);
const deleteByIdService = (id) => User.findByIdAndDelete(id);
const updateService = (id, name, username, email, password, img, background) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, img, background },
    { rawResult: true }
  );

export {
  createService,
  findAllService,
  findByIdService,
  deleteByIdService,
  updateService,
};