const port = process.env.PORT || 3000;

const express = require("express");

const server = express();

server.use(express.json());

server.listen(port, () => console.log("server listening"));

const destinations = [];

server.get("/marshall", (req, res) => {
    res.send("<h1>Would you like to play a game?</h1>");
});

server.get("/coffee", (req, res) => {
    res.status(418).send({ error: "I'm a teapot" });
});

server.post("/destinations", (req, res) => {
    let { destination, location, photo, description } = req.body;
    if (
        !destination ||
        !location ||
        destination.length === 0 ||
        location.length === 0
    ) {
        return res.status(400).send({
            error: "Destination and location are both required",
        });
    } else {
        console.log(req.body);
    }
});
