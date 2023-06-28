//Imports
require("dotenv").config();
const express = require("express");
const app = express();
const userRoute = require("./src/routes/user.route");
const connectDatabase = require("./src/database/db");

//variables
const PORT = process.env.PORT || 3000;

//config
connectDatabase(); //Conexão com banco de dados MongoDB
app.use(express.json()); //Para conseguir receber o json no body da requisição

//routes
app.use("/user", userRoute);
app.get("/", ( _, res ) => res.send("Bem-vindo ao App!"));

//Port
app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));