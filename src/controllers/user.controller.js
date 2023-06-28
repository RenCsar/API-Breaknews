import { createService, findAllService, deleteByIdService, updateService } from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, username, email, password, img, background } = req.body;

    //Validations
    if (!name || !username || !email || !password || !img || !background) {
      return res.status(400).send({
        message: "Por favor, preencha todos os requisitos do formulário!",
      });
    }

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
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

const findAll = async (_, res) => {
  try {
    const users = await findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "Nenhum usuário registrado!" });
    }

    res.send(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.id;
    await deleteByIdService(id);
    res.status(200).send({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, img, background } = req.body;

    //Validations
    if (!name && !username && !email && !password && !img && !background) {
      return res.status(400).send({
        message:
          "Por favor, preencha pelo menos um dos requisitos do formulário!",
      });
    }

    const id = req.id;

    await updateService(
      id,
      name,
      username,
      email,
      password,
      img,
      background
    );

    res.status(201).send({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

export { create, findAll, findById, deleteById, update };