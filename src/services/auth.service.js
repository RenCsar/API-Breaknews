import bcrypt from "bcrypt";
import {
  generateToken,
  loginRepository,
} from "../repositories/auth.repositories.js";

const loginService = async ({ email, password }) => {
  try {
    const user = await loginRepository(email);

    if (!user) throw new Error("Usuário ou senha inválidos!");

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) throw new Error("Usuário ou senha inválidos!");

    const token = generateToken(user.id);

    return token;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { loginService };