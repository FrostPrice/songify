const db = require("../models");
const Artist = db.artist;
const Genre = db.genre;
const Album = db.album;

const Op = db.Sequelize.Op;

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
