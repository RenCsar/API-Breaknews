import News from "../models/News.js";

const createService = (body) => News.create(body);
const findAllService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");
const countNews = () => News.countDocuments();
const topNewsService = () => News.findOne().sort({_id: -1}).populate("user");
const findByidService = (id) => News.findById(id).populate("user");
const searchByTitleService = (title) => News.find({
    title: {$regex: `${title || ""}`, $options: "i"} // regex title ou parte desse title; option: "i" para não ser case-sensitive
}).sort({_id: -1}).populate("user");

export { createService, findAllService, countNews, topNewsService, findByidService, searchByTitleService };