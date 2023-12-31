import { Types } from "mongoose";
import { findByIdRepository } from "../repositories/user.repositories.js";
import { findByIdRepository as findNewsbyIdRepository } from "../repositories/news.repositories.js";
import User from "../models/User.js";

const lowerCases = (req, _, next) => {
  req.body.name && (req.body.name = req.body.name.toLowerCase());
  req.body.email && (req.body.email = req.body.email.toLowerCase());
  req.body.username && (req.body.username = req.body.username.toLowerCase());

  next();
};

const checkExtraFields = (model) => {
  return (req, res, next) => {
    const fields = Object.keys(req.body); // Obtenha as chaves dos campos enviados
    const extraFields = fields.filter((field) => !model.schema.path(field));

    if (extraFields.length > 0) {
      return res.status(400).send({
        message: "Existem campos inválidos no corpo da requisição.",
        extraFields,
      });
    }
    next();
  };
};

const userExist = async (req, res, next) => {
  const { username, email } = req.body;

  const usernameExist = await User.findOne({ username: username });

  if (usernameExist) {
    return res.status(422).send({ message: "Nome de usuário já cadastrado!" });
  }

  const emailExist = await User.findOne({ email: email });

  if (emailExist) {
    return res.status(422).send({ message: "E-mail já cadastrado!" });
  }

  next();
};

const validId = (req, res, next) => {
  const id = req.params.id;

  //Checar se o id é válido e pertence ao padrão do mongoDB
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Id inválido!" });
  }

  next();
};

const validUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await findByIdRepository(id);

  if (!user) {
    return res.status(400).send({ message: "Usuário não encontrado!" });
  }

  req.id = id;
  req.user = user;

  next();
};

const validNews = async (req, res, next) => {
  const id = req.params.id;

  const news = await findNewsbyIdRepository(id);

  if (!news) {
    return res.status(400).send({ message: "Notícia não encontrada!" });
  }

  req.id = id;
  req.news = news;

  next();
};

const validEmail = (req, res, next) => {
  const email = req.body.email;
  if (email && !email.includes("@")) {
    return res.status(422).send({ message: "Digite um e-mail válido!" });
  }
  next();
};

const checkPassword = (req, res, next) => {
  const { password, confirmpassword } = req.body;
  if (password !== confirmpassword) {
    return res.status(422).send({ message: "As senhas devem ser iguais!" });
  }
  next();
};

const checkOwnerPost = async (req, res, next) => {
  const { id } = req.params;

  const news = await findNewsbyIdRepository(id);

  if (!news) {
    return res.status(400).send({ messege: "Nenhuma Notícia encontrada!" });
  }

  //Verificar se quem está editando é o dono da postagem
  if (String(news.user._id) != String(req.userId)) {
    return res
      .status(401)
      .send({ messege: "Você não pode deletar essa postagem!" });
  }

  req.postId = id;
  next();
};

export {
  validId,
  validUser,
  checkExtraFields,
  lowerCases,
  validEmail,
  userExist,
  validNews,
  checkOwnerPost,
  checkPassword,
};