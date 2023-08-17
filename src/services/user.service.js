import {
  createRepository,
  findAllRepository,
  deleteByIdRepository,
  updateRepository,
  findByIdRepository,
} from "../repositories/user.repositories.js";

export const createService = async (body) => {
  try {
    const { name, username, email, password, img, background } = body;
    const data = {
      name,
      username,
      email,
      password,
      img,
      background,
    };

    //Validations
    if (!name || !username || !email || !password || !img || !background)
      throw new Error("Por favor, preencha todos os requisitos do formulário!");

    //Create user
    const user = await createRepository(data);
    return {
      msg: "Usuário cadastrado com sucesso!",
      user: {
        id: user._id,
        name,
        username,
        email,
        img,
        background,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const findAllService = async () => {
  try {
    const users = await findAllRepository();

    if (users.length === 0) throw new Error("Nenhum usuário registrado!");

    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const findByIdService = async (userId) => {
  try {
    return await findByIdRepository(userId);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteByIdService = async (id) => {
  try {
    return deleteByIdRepository(id);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateService = async (body) => {
  try {
    const { id, name, username, email, password, img, background } = body;

    //Validations
    if (!name && !username && !email && !password && !img && !background) {
      return res.status(400).send({
        message:
          "Por favor, preencha pelo menos um dos requisitos do formulário!",
      });
    }

    return await updateRepository(
      id,
      name,
      username,
      email,
      password,
      img,
      background
    );
  } catch (err) {
    throw new Error(err.message);
  }
};