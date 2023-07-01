import { createService, findAllService } from "../services/news.service.js";

const create = (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res.status(400).send({
        message: "Por favor, preencha todos os requisitos do formulário!",
      });
    }

    res.status(201).send({ messege: "Post criado com sucesso!" });
  } catch (error) {
    res.status(500).send({ messege: error.messege });
  }
};

const findAll = (req, res) => {
  const news = [];
  res.status(200).send({ news });
};

export { create, findAll };
