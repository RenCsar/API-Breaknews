//Imports
import dotenv from 'dotenv';
import express, { json } from "express";
import connectDatabase from "./src/database/db.js";

//Routes imports
import userRoute from "./src/routes/user.route.js";
import authRoute from './src/routes/auth.route.js';

//variables
const app = express();
const PORT = process.env.PORT || 3000;

//config
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
connectDatabase(); //Conexão com banco de dados MongoDB
app.use(json()); //Para conseguir receber o json no body da requisição

//routes
app.get("/", ( _, res ) => res.send("Bem-vindo ao App!"));
app.use("/user", userRoute);
app.use("/auth", authRoute);

//Server listening
app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));