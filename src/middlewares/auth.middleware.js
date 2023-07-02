import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { findByIdService } from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ messege: "Não autorizado!" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(401).send({ messege: "Não autorizado!" });
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.status(401).send({ messege: "Não autorizado!" });
    }

    jwt.verify(token, process.env.SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ messege: "Token inválido!" });
      }

      const user = await findByIdService(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ messege: "Token inválido!" });
      }

      req.userId = user._id;

      return next();
    });
  } catch (error) {
    res.status(500).send({ messege: error.messege });
  }
};
