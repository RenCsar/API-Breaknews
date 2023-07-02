import { createService, findAllService } from "../services/news.service.js";

const create = async (req, res) => {
  try {    
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res.status(400).send({
        message: "Por favor, preencha todos os requisitos do formulário!",
      });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.status(201).send({ messege: "Post criado com sucesso!" });
  } catch (error) {
    res.status(500).send({ messege: error.messege });
  }
};

const findAll = async (req, res) => {
  try {
    const news = await findAllService();

    if (news.length === 0) {
      return res.status(400).send({ message: "Nenhuma postagem registrada!" });
    }

    res.status(200).send(news);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export { create, findAll };