const express = require("express");
const postRouter = require("../routes/postRoutes");

const server = express();

server.use(express.json());

server.use("/api/posts", postRouter);

module.exports = server;
