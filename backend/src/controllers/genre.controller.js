const db = require("../models");
const Genre = db.genre;

exports.insert = (req, res) => {
  Genre.create({
    name: req.body.name,
  })
    .then((genre) => {
      res.send({ message: "Genre registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.get = (req, res) => {
  Genre.findAll()
    .then((genres) => {
      res.send(genres);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Genre.update(req.body, {
    where: { id: id },
  })
    .then((genre) => {
      if (genre == 1) {
        res.send({ message: "Genre was updated successfully." });
      } else {
        res.send({ message: `Cannot update Genre with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Genre.destroy({
    where: { id: id },
  })
    .then((genre) => {
      if (genre == 1) {
        res.send({ message: "Genre was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Genre with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
