import { Schema, model } from "mongoose";

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    select: false, //Não retorna a senha na hora da consulta
  },
  img: {
    type: String,
    require: true,
  },
  background: {
    type: String,
    require: true,
  },
});

const User = model("User", UserSchema);

export default User;