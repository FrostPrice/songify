const db = require("../models");
const Album = db.album;
const Music = db.music;
const Artist = db.artist;

const Op = db.Sequelize.Op;

// * SQL Script: INSERT
// INSERT INTO "Albums" ("id","name","duration","releaseDate","createdAt","updatedAt") VALUES (DEFAULT,'name','duration','releaseDate','createdAt','updatedAt');
// INSERT INTO "artistas_album" ("id","createdAt","updatedAt","ArtistaId","AlbumId") VALUES (DEFAULT,'createdAt','updatedAt','ArtistaId','AlbumId');
// INSERT INTO "album_musicas" ("id","createdAt","updatedAt","AlbumId","MusicaId") VALUES (DEFAULT,'createdAt','updatedAt','AlbumId','MusicaId');
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

// * SQL Script: SELECT
// SELECT "Albums"."id", "Albums"."name", "Albums"."duration", "Albums"."releaseDate", "Artistas"."name" AS "Artistas.name", "Artistas"."id" AS "Artistas.id", "Artistas"."createdAt" AS "Artistas.createdAt", "Artistas"."updatedAt" AS "Artistas.updatedAt" FROM "Albums" AS "Albums" LEFT OUTER JOIN ("artistas_album" AS "ArtistaAlbum" INNER JOIN "Artistas" AS "Artistas" ON "ArtistaAlbum"."ArtistaId" = "Artistas"."id") ON "Albums"."id" = "ArtistaAlbum"."AlbumId";
exports.get = (req, res) => {
  Album.findAll()
    .then((albums) => {
      res.send(albums);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// * SQL Script: UPDATE
// UPDATE "Albums" SET "name"='name','duration'='duration','releaseDate'='releaseDate','createdAt'='createdAt','updatedAt'='updatedAt' WHERE "id" = id;
// UPDATE "artistas_album" SET "createdAt"='createdAt','updatedAt'='updatedAt','ArtistaId'='ArtistaId','AlbumId'='AlbumId' WHERE "id" = id;
// UPDATE "album_musicas" SET "createdAt"='createdAt','updatedAt'='updatedAt','AlbumId'='AlbumId','MusicaId'='MusicaId' WHERE "id" = id;
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

// * SQL Script: DELETE
// DELETE FROM "Albums" WHERE "id" = id;
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
