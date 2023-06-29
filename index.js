//Imports
import dotenv from 'dotenv';
import express, { json } from "express";
import userRoute from "./src/routes/user.route.js";
import connectDatabase from "./src/database/db.js";
const app = express();

//variables
const PORT = process.env.PORT || 3000;

//config
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
connectDatabase(); //Conexão com banco de dados MongoDB
app.use(json()); //Para conseguir receber o json no body da requisição

//routes
app.get("/", ( _, res ) => res.send("Bem-vindo ao App!"));
app.use("/user", userRoute);

//Server listening
app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));