const db = require("../models");
const Genre = db.genre;

// * SQL Script: INSERT
// INSERT INTO "Generos" ("id","name","createdAt","updatedAt") VALUES (DEFAULT,'name','createdAt','updatedAt');
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

// * SQL Script: SELECT
// SELECT "id", "name", "createdAt", "updatedAt" FROM "Generos" AS "Generos";
exports.get = (req, res) => {
  Genre.findAll()
    .then((genres) => {
      res.send(genres);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// * SQL Script: UPDATE
// UPDATE "Generos" SET "name"='name','updatedAt'='updatedAt' WHERE "id" = 'id';
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

// * SQL Script: DELETE
// DELETE FROM "Generos" WHERE "id" = id;
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
