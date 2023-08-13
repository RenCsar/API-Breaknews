import { loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const token = await loginService(req.body);
    return res
      .status(200)
      .header("Authorization", "Bearer " + token)
      .send({ message: "Login realizado com sucesso!", token: `Bearer ${token}` });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export { login };