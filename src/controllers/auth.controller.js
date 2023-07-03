import bcrypt from "bcrypt";
import { generateToken, loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email);

    if (!user) {
      return res.status(400).send({ messege: "Usuário ou senha inválidos!" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({ messege: "Usuário ou senha inválidos!" });
    }

    const token = generateToken(user.id);

    res
      .status(200)
      .header("Authorization", "Bearer" + token)
      .send({ message: "Login realizado com sucesso!", token: token });
  } catch (err) {
    res.status(500).send({ message: err.message });  }
};

export { login };