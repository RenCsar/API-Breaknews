import { Schema, model } from "mongoose";

const NewsSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  subtitle: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  banner: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: Array,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  likes: {
    type: Array,
    require: true,
  },
  comments: {
    type: Array,
    require: true,
  },
});

const News = model("News", NewsSchema);

export default News;