const db = require("../models");
const Album = db.album;
const Music = db.music;
const Artist = db.artist;

const Op = db.Sequelize.Op;

exports.insert = (req, res) => {
  Album.create({
    name: req.body.name,
    duration: req.body.duration,
    releaseDate: req.body.releaseDate,
  })
    .then((album) => {
      if (req.body.artistName) {
        Artist.findAll({
          where: {
            name: {
              [Op.or]: req.body.artistName,
            },
          },
        }).then((artist) => {
          album.setArtistas(artist).catch((err) => {
            res.status(404).send({ message: "Artist not found" });
          });
        });
      }

      if (!req.body.musics) {
        res.send({ message: "Album registered successfully!" });
      } else {
        Music.findAll({
          where: {
            name: {
              [Op.or]: req.body.musics,
            },
          },
        })
          .then((musicsFound) => {
            musicsFound.forEach((music) => {
              album.setMusicas(music).catch((err) => {
                res.status(404).send({ message: "Music not found" });
              });
            });

            res.send({ message: "Album registered successfully!" });
          })
          .catch((err) => {
            res.status(404).send({ message: "Musics not found" });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.get = (req, res) => {
  Album.findAll()
    .then((albums) => {
      res.send(albums);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Album.update(req.body, {
    where: { id: id },
  })
    .then((album) => {
      if (req.body.artistName) {
        Artist.findAll({
          where: {
            name: {
              [Op.or]: req.body.artistName,
            },
          },
        }).then((artist) => {
          album.setArtistas(artist).catch((err) => {
            res.status(404).send({ message: "Artist not found" });
          });
        });
      }

      if (!req.body.musics) {
        if (album == 1) {
          res.send({ message: "Album was updated successfully." });
        } else {
          res.send({ message: `Cannot update Album with id=${id}.` });
        }
      } else {
        Music.findAll({
          where: {
            name: {
              [Op.or]: req.body.musics,
            },
          },
        })
          .then((musicsFound) => {
            musicsFound.forEach((music) => {
              album.setMusicas(music).catch((err) => {
                res.status(404).send({ message: "Music not found" });
              });
            });

            if (album == 1) {
              res.send({ message: "Album was updated successfully." });
            } else {
              res.send({ message: `Cannot update Album with id=${id}.` });
            }
          })
          .catch((err) => {
            res.status(404).send({ message: "Musics not found" });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Album.destroy({
    where: { id: id },
  })
    .then((album) => {
      if (album == 1) {
        res.send({ message: "Album was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Album with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
