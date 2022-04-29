const port = process.env.PORT || 3000;

const express = require("express");

const server = express();

server.use(express.json());

server.listen(port, () => console.log("server listening"));

const destinations = [];

const students = {
    will: { name: "Will", city: "Detroit", interests: ["cars"] },
    nikko: { name: "Nikko", city: "Detroit", interests: ["bananas"] },
    marshall: {
        name: "Marshall",
        city: "Kansas City",
        interests: ["acting"],
    },
    mannie: {
        name: "Mannie",
        city: "Georgia",
        interests: ["soccer", "bananas"],
    },
};

server.get("/students/name/:name", (req, res) => {
    let { name } = req.params;
    if (name) {
        const student = students[name.toLowerCase()];
        if (student) {
            return res.send(student);
        }
        return res
            .status(404)
            .send({ error: `Student named ${name} not found` });
    }
});

server.get("/students/city/:city", (req, res) => {
    let { city } = req.params;
    let tempStudents = Object.values(students);
    if (city) {
        return res.send(
            tempStudents.filter(
                (stu) => stu.city.toLowerCase() === city.toLowerCase()
            )
        );
    }
});

server.get("/students/interest/:interest", (req, res) => {
    let { interest } = req.params;
    let tempStudents = Object.values(students);
    if (interest) {
        return res.send(
            tempStudents.filter((stu) =>
                stu.interests.includes(interest.toLowerCase())
            )
        );
    }
});

server.get("/students", (req, res) => {
    const { name, interest, city } = req.query;

    if (name) {
        const student = students[name.toLowerCase()];
        if (student) {
            return res.send(student);
        }
        return res
            .status(404)
            .send({ error: `Student named ${name} not found` });
    }

    let tempStudents = Object.values(students);

    if (city) {
        tempStudents = tempStudents.filter(
            (stu) => stu.city.toLowerCase() === city.toLowerCase()
        );
    }

    if (interest) {
        tempStudents = tempStudents.filter((stu) =>
            stu.interests.includes(interest.toLowerCase())
        );
    }

    return res.send(tempStudents);
});

server.get("/destinations", (req, res) => {
    res.send(destinations);
});

server.get("/coffee", (req, res) => {
    res.status(418).send({ error: "I'm a teapot" });
});

server.get("/tea", (req, res) => {
    res.send(
        '<img src="https://i.kym-cdn.com/entries/icons/mobile/000/015/878/thatsnoneofmy.jpg"/>'
    );
});

server.get("/rickroll", (req, res) => {
    res.redirect("https://youtu.be/bubOcI11sps");
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
    }
    const newDestination = {
        destination,
        location,
        photo: photo && photo.length ? photo : "insert placeholder here",
        description: description ? description : "",
    };

    destinations.push(newDestination);

    res.redirect(303, "/destinations");
});
