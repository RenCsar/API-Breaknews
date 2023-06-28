const userServices = require("../services/user.service");

const create = async (req, res) => {
  const { name, username, email, password, img, background } = req.body;

  //Validations
  if (!name || !username || !email || !password || !img || !background) {
    return res.status(400).send({
      message: "Por favor, preencha todos os requisitos do formulário!",
    });
  }

  //Create user
  try {
    const user = await userServices.createService(req.body);
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
    return res.status(400).send({ message: "Erro ao criar usuário!" });
  }
};

const findAll = async (_, res) => {
  const users = await userServices.findAllService();

  if (users.length === 0) {
    return res.status(400).send({ message: "Nenhum usuário registrado!" });
  }

  res.send(users);
};

const findById = async (req, res) => {
  const user = req.user;
  res.status(200).send(user);
};

const deleteById = async (req, res) => {
  const id = req.id;
  try {
    await userServices.deleteByIdService(id);
    res.status(200).send({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Houve um erro ao deletar o usuário!" });
  }
};

const update = async (req, res) => {
  const { name, username, email, password, img, background } = req.body;

  //Validations
  if (!name && !username && !email && !password && !img && !background) {
    return res.status(400).send({
      message:
        "Por favor, preencha pelo menos um dos requisitos do formulário!",
    });
  }

  const id = req.id;

  try {
    await userServices.updateService(
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
    res.status(500).send({ message: "Houve um erro ao atualizar o usuário!" });
  }
};

module.exports = { create, findAll, findById, deleteById, update };