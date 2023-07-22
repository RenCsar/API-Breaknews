import {
  createService,
  findAllService,
  deleteByIdService,
  updateService,
  findByIdService,
} from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, username, email, img, background } = req.body;

    //Create user
    const user = await createService(req.body);
    res.status(201).send({
      msg: "Usuário cadastrado com sucesso!",
      user: {
        id: user._id,
        name,
        username,
        email,
        img,
        background,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (_, res) => {
  try {
    const users = await findAllService();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = await findByIdService(req.user);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.id;
    await deleteByIdService(id);
    res.status(200).send({ message: "Usuário deletado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    req.body.id = req.id;

    await updateService(req.body);

    res.status(201).send({ message: "Usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { create, findAll, findById, deleteById, update };