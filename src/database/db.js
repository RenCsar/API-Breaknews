import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassWord = process.env.DB_PASS;
const dbName = process.env.DB_DB;

const connectDatabase = () => {
    console.log("Esperando conexão com o banco de dados...")
  mongoose.Promise = global.Promise;
  mongoose
    .connect(
      `mongodb+srv://${dbUser}:${dbPassWord}@cluster0.ht2chpm.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("MongoDB conectado com sucesso!");
    })
    .catch((error) => {
      console.log('Erro ao conectar com o banco de dados:', error);
    });
};

export default connectDatabase;