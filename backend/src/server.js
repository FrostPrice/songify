require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./models");

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initial();
});

// routes
require("./routes/test.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/genre.routes")(app);
require("./routes/album.routes")(app);
require("./routes/artist.routes")(app);
require("./routes/music.routes")(app);
require("./routes/recommendation.routes")(app);

// set port, listen for requests
const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Set Default values
function initial() {
  const roles = [
    {
      name: "user",
    },
    {
      name: "artist",
    },
    {
      name: "admin",
    },
  ];
  const genres = [
    {
      name: "Unknown",
    },
    { name: "Rock" },
    { name: "Pop" },
    { name: "Hip Hop" },
  ];
  const users = [
    {
      username: "admin",
      age: 25,
      musical_preference: "Rock",
      email: "admin@example.com",
      password: "1234",
    },
    {
      username: "John Doe",
      age: 25,
      musical_preference: "Rock",
      email: "john.doe@example.com",
      password: "password123",
    },
    {
      username: "Jane Smith",
      age: 30,
      musical_preference: "Pop",
      email: "jane.smith@example.com",
      password: "pass456",
    },
    {
      username: "Bob Johnson",
      age: 22,
      musical_preference: "Hip Hop",
      email: "bob.johnson@example.com",
      password: "secure789",
    },
  ];
  const artists = [
    { name: "The Beatles", age: 60 },
    { name: "Taylor Swift", age: 32 },
    { name: "Kendrick Lamar", age: 34 },
  ];
  const albums = [
    { name: "Abbey Road", duration: 45.5, releaseDate: "1969-09-26" },
    { name: "1989", duration: 40.2, releaseDate: "2014-08-18" },
    { name: "To Pimp a Butterfly", duration: 55.8, releaseDate: "2015-03-15" },
  ];

  db.role.bulkCreate(roles);
  db.genre.bulkCreate(genres);

  console.log("Sample data inserted successfully!");
}
