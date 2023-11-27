const db = require("../models");
const Recommendation = db.recommendation;
const Music = db.music;
const Artist = db.artist;
const User = db.user;

const Op = db.Sequelize.Op;

exports.insert = async (req, res) => {
  let musicsWithSameGenre = [];
  let artistsWithSameGenre = [];

  if (req.body.type === "music" && req.body.music) {
    try {
      const music = await Music.findOne({
        where: { name: req.body.music },
        include: {
          model: db.genre,
        },
      });
      if (!music) return res.status(404).send({ message: "Music not found" });

      const genres = await music.getGeneros();
      const promises = genres.map((genre) => genre.getMusicas());
      const musics = await Promise.all(promises);
      musicsWithSameGenre = musics;
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else if (req.body.type === "artist" && req.body.artist) {
    try {
      const artist = await Artist.findOne({
        where: { name: req.body.artist },
        include: {
          model: db.genre,
        },
      });
      if (!artist) return res.status(404).send({ message: "Artist not found" });

      const genres = await artist.getGeneros();
      const promises = genres.map((genre) => genre.getArtista());
      const artists = await Promise.all(promises);
      artistsWithSameGenre = artists;
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    return res.status(500).send({ message: "No music or artist informed" });
  }

  if (musicsWithSameGenre.length === 0 && artistsWithSameGenre.length === 0) {
    return res
      .status(500)
      .send({ message: "No recommendation could be created" });
  }

  try {
    let recommendation = await Recommendation.create({
      name: req.body.name,
    });

    const user = await User.findOne({
      where: { id: req.userId },
    });
    if (!user) return res.status(403).send({ message: "User not found" });

    await recommendation.setUsuarios(user);

    if (req.body.music && musicsWithSameGenre.length > 0) {
      for (let i = 0; i < musicsWithSameGenre.length; i++) {
        await recommendation.setMusicas(musicsWithSameGenre[i]);
      }

      await Recommendation.update(
        { type: "music" },
        { where: { id: recommendation.id } }
      );

      await recommendation.setUsuarios(user);

      return res.send({ message: "Recommendation registered successfully!" });
    } else if (req.body.artist && artistsWithSameGenre.length > 0) {
      for (let i = 0; i < artistsWithSameGenre.length; i++) {
        recommendation.setArtista(artistsWithSameGenre[i]);
      }
      await Recommendation.update(
        { type: "artist" },
        { where: { id: recommendation.id } }
      );

      await recommendation.setUsuarios(user);

      return res.send({ message: "Recommendation registered successfully!" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Recommendation,
          through: "usuario_recomendacao",
        },
      ],
    });

    const recommendations = await user.getRecomendacaos();

    if (!recommendations || recommendations.length === 0)
      return res.status(200).send([]);
    let recommendationsData = [];

    for (let i = 0; i < recommendations.length; i++) {
      const recommendation = recommendations[i];

      if (recommendation.type === "artist") {
        const artists = await recommendation.getArtista();

        let artistData = [];

        artists.forEach((artist) => {
          artistData.push(artist);
        });

        recommendationsData.push({
          id: recommendation.id,
          name: recommendation.name,
          type: recommendation.type,
          artists: artistData,
        });
      } else {
        const musics = await recommendation.getMusicas();

        let musicsData = [];

        musics.forEach((music) => {
          musicsData.push(music);
        });

        recommendationsData.push({
          id: recommendation.id,
          name: recommendation.name,
          type: recommendation.type,
          musics: musicsData,
        });
      }
    }

    res.send(recommendationsData);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const updateData = {
      name: req.body.name,
    };
    const updateRecomendation = await Recommendation.update(updateData, {
      where: { id: id },
    });

    if (updateRecomendation == 1) {
      res.send({ message: "Recommendation was updated successfully." });
    } else {
      res.send({ message: `Cannot update Recommendation with id=${id}.` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Recommendation.destroy({
    where: { id: id },
  })
    .then((recommendation) => {
      if (recommendation == 1) {
        res.send({ message: "Recommendation was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Recommendation with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
