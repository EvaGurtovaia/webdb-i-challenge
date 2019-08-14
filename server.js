const express = require("express");

const db = require("./data/dbConfig.js");

const AccountsRouter = require("./accounts-router.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", AccountsRouter);

server.get("/", (req, res) => {
    res.send(`
    <h2>Hi!!!</h2>
   
  `);
});

module.exports = server;
