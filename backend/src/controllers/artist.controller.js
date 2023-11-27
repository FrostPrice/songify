const db = require("../models");
const Artist = db.artist;
const Genre = db.genre;
const Album = db.album;

const Op = db.Sequelize.Op;

// * SQL Script: INSERT
// INSERT INTO "Artistas" ("id","name","age","createdAt","updatedAt") VALUES (DEFAULT,'name','age','createdAt','updatedAt');
// INSERT INTO "genero_artista" ("id","createdAt","updatedAt","GeneroId","ArtistaId") VALUES (DEFAULT,'createdAt','updatedAt','GeneroId','ArtistaId');
// INSERT INTO "album_artistas" ("id","createdAt","updatedAt","AlbumId","ArtistaId") VALUES (DEFAULT,'createdAt','updatedAt','AlbumId','ArtistaId');
exports.insert = async (req, res) => {
  try {
    const artist = await Artist.create({
      name: req.body.name,
      age: req.body.age,
    });

    if (req.body.genre) {
      const genres = await Genre.findOne({
        where: {
          name: req.body.genre,
        },
      });

      await artist.setGeneros(genres);

      if (req.body.albuns) {
        const albumsFound = await Album.findAll({
          where: {
            name: {
              [Op.or]: req.body.albuns,
            },
          },
        });

        for (const album of albumsFound) {
          await artist.setAlbum(album);
        }
      }
    } else {
      await artist.setGeneros([1]);
    }

    res.send({ message: "Artist registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// * SQL Script: SELECT
// SELECT "Artistas"."id", "Artistas"."name", "Artistas"."age", "Generos"."name" AS "Generos.name", "Generos"."id" AS "Generos.id", "Generos"."createdAt" AS "Generos.createdAt", "Generos"."updatedAt" AS "Generos.updatedAt" FROM "Artistas" AS "Artistas" LEFT OUTER JOIN ("genero_artista" AS "GeneroArtista" INNER JOIN "Generos" AS "Generos" ON "GeneroArtista"."GeneroId" = "Generos"."id") ON "Artistas"."id" = "GeneroArtista"."ArtistaId";
exports.get = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    let artistsData = [];
    for (let i = 0; i < artists.length; i++) {
      const genres = await artists[i].getGeneros();

      artistsData.push({
        id: artists[i].id,
        name: artists[i].name,
        age: artists[i].age,
        genre: genres[0].name,
      });
    }
    res.send(artistsData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// * SQL Script: UPDATE
// UPDATE "Artistas" SET "name"='name','age'='age','createdAt'='createdAt','updatedAt'='updatedAt' WHERE "id" = 'id';
// UPDATE "genero_artista" SET "createdAt"='createdAt','updatedAt'='updatedAt','GeneroId'='GeneroId','ArtistaId'='ArtistaId' WHERE "id" = 'id';
// UPDATE "album_artistas" SET "createdAt"='createdAt','updatedAt'='updatedAt','AlbumId'='AlbumId','ArtistaId'='ArtistaId' WHERE "id" = 'id';
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const updateArtist = await Artist.update(req.body, {
      where: { id: id },
    });

    const artist = await Artist.findOne({
      where: { id: id },
    });

    if (req.body.genre) {
      const genres = await Genre.findOne({
        where: {
          name: req.body.genre,
        },
      });

      await artist.setGeneros(genres);

      if (req.body.albuns) {
        const albumsFound = await Album.findAll({
          where: {
            name: {
              [Op.or]: req.body.albuns,
            },
          },
        });

        for (const album of albumsFound) {
          await artist.setAlbum(album);
        }
      }
    } else {
      await artist.setGeneros([1]);
    }

    if (updateArtist == 1) {
      res.send({ message: "Artist was updated successfully." });
    } else {
      res.send({ message: `Cannot update Artist with id=${id}.` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// * SQL Script: DELETE
// DELETE FROM "Artistas" WHERE "id" = id;
exports.delete = (req, res) => {
  const id = req.params.id;

  Artist.destroy({
    where: { id: id },
  })
    .then((artist) => {
      if (artist == 1) {
        res.send({ message: "Artist was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Artist with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
