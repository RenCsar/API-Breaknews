import bcrypt from "bcrypt";
import {
  generateToken,
  loginRepository,
} from "../repositories/auth.repositories.js";

const loginService = async ({ email, password }) => {
  try {
    const user = await loginRepository(email);

    const { name, username, img, background } = user;

    if (!user) throw new Error("Usuário ou senha inválidos!");

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) throw new Error("Usuário ou senha inválidos!");

    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user._id,
        name,
        username,
        email: user.email,
        img,
        background,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

export { loginService };