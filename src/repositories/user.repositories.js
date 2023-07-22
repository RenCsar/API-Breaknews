import User from "../models/User.js";

const createRepository = (body) => User.create(body);
const findAllRepository = () => User.find();
const findByIdRepository = (id) => User.findById(id);
const deleteByIdRepository = (id) => User.findByIdAndDelete(id);
const updateRepository = (id, name, username, email, password, img, background) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, img, background },
    { rawResult: true }
  );

export {
  createRepository,
  findAllRepository,
  findByIdRepository,
  deleteByIdRepository,
  updateRepository,
};