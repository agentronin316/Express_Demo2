const port = 3000;

const express = require("express");

const server = express();

server.listen(port, () => console.log("server listening"));

server.get("/marshall", (req, res) => {
    res.send("<h1>Would you like to play a game?</h1>");
});
