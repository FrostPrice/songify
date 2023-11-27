const db = require("../models");
const Music = db.music;
const Genre = db.genre;
const Album = db.album;

const Op = db.Sequelize.Op;

// * SQL Script: INSERT
// INSERT INTO "Musicas" ("id","name","duration","releaseDate","createdAt","updatedAt") VALUES (DEFAULT,'name','duration','releaseDate','createdAt','updatedAt');
// INSERT INTO "genero_musica" ("id","createdAt","updatedAt","GeneroId","MusicaId") VALUES (DEFAULT,'createdAt','updatedAt','GeneroId','MusicaId');
// INSERT INTO "album_musicas" ("id","createdAt","updatedAt","AlbumId","MusicaId") VALUES (DEFAULT,'createdAt','updatedAt','AlbumId','MusicaId');
exports.insert = async (req, res) => {
  try {
    const music = await Music.create({
      name: req.body.name,
      duration: req.body.duration,
      releaseDate: req.body.releaseDate,
    });

    if (req.body.genre) {
      const genres = await Genre.findOne({
        where: {
          name: req.body.genre,
        },
      });

      if (!genres) {
        return res.status(404).send({ message: "Genre not found" });
      }

      await music.setGeneros(genres);

      if (req.body.albumName) {
        const albums = await Album.findAll({
          where: {
            name: {
              [Op.or]: req.body.albumName,
            },
          },
        });

        if (!albums) {
          return res.status(404).send({ message: "Album not found" });
        }

        await music.setAlbum(albums);
      }
    } else {
      await music.setGeneros([1]);
    }

    res.send({ message: "Music registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// * SQL Script: GET
// SELECT "Musicas"."id", "Musicas"."name", "Musicas"."duration", "Musicas"."releaseDate", "Generos"."name" AS "Generos.name", "Generos"."id" AS "Generos.id", "Generos"."createdAt" AS "Generos.createdAt", "Generos"."updatedAt" AS "Generos.updatedAt" FROM "Musicas" AS "Musicas" LEFT OUTER JOIN ("genero_musica" AS "GeneroMusica" INNER JOIN "Generos" AS "Generos" ON "GeneroMusica"."GeneroId" = "Generos"."id") ON "Musicas"."id" = "GeneroMusica"."MusicaId";
exports.get = async (req, res) => {
  try {
    const musics = await Music.findAll();

    let musicsData = [];
    for (let i = 0; i < musics.length; i++) {
      const genres = await musics[i].getGeneros();

      musicsData.push({
        id: musics[i].id,
        name: musics[i].name,
        duration: musics[i].duration,
        releaseDate: musics[i].releaseDate,
        genre: genres[0].name,
      });
    }
    res.send(musicsData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// * SQL Script: UPDATE
// UPDATE "Musicas" SET "name"='name','duration'='duration','releaseDate'='releaseDate','createdAt'='createdAt','updatedAt'='updatedAt' WHERE "id" = id;
// UPDATE "genero_musica" SET "createdAt"='createdAt','updatedAt'='updatedAt','GeneroId'='GeneroId','MusicaId'='MusicaId' WHERE "id" = id;
// UPDATE "album_musicas" SET "createdAt"='createdAt','updatedAt'='updatedAt','AlbumId'='AlbumId','MusicaId'='MusicaId' WHERE "id" = id;
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const updateMusic = await Music.update(req.body, {
      where: { id: id },
      include: [
        {
          model: Genre,
          through: "genero_musica",
        },
      ],
    });

    const music = await Music.findOne({
      where: { id: id },
      include: [
        {
          model: Genre,
          through: "genero_musica",
        },
      ],
    });

    if (req.body.genre) {
      const genres = await Genre.findOne({
        where: {
          name: req.body.genre,
        },
      });

      if (!genres) {
        return res.status(404).send({ message: "Genre not found" });
      }

      await music.setGeneros(genres);

      if (req.body.albumName) {
        const albums = await Album.findAll({
          where: {
            name: {
              [Op.or]: req.body.albumName,
            },
          },
        });

        if (!albums) {
          return res.status(404).send({ message: "Album not found" });
        }

        await music.setAlbum(albums);
      }
    } else {
      await music.setGeneros([1]);
    }

    if (updateMusic == 1) {
      res.send({ message: "Music was updated successfully." });
    } else {
      res.send({ message: `Cannot update Music with id=${id}.` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// * SQL Script: DELETE
// DELETE FROM "Musicas" WHERE "id" = id;
exports.delete = (req, res) => {
  const id = req.params.id;

  Music.destroy({
    where: { id: id },
  })
    .then((music) => {
      if (music == 1) {
        res.send({ message: "Music was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Music with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
