const express = require("express");
const cors = require("cors");
const postRouter = require("../routes/postRoutes");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/posts", postRouter);

module.exports = server;
