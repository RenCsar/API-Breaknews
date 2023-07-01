import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.SECRET;

const loginService = (email) => User.findOne({ email: email }).select("+password");
const generateToken = (id) => jwt.sign({ id: id }, secret, { expiresIn: 86400 });

export { loginService, generateToken };