const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  logging: false, // Enable logging for debugging
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.artist = require("./artist.model.js")(sequelize, Sequelize);
db.music = require("./music.model.js")(sequelize, Sequelize);
db.recommendation = require("./recommendation.model.js")(sequelize, Sequelize);
db.genre = require("./genre.model.js")(sequelize, Sequelize);
db.album = require("./album.model.js")(sequelize, Sequelize);

//// * Relationships
db.userPermissions = db.sequelize.define("usuario_permissoes");
// User - Role
db.role.belongsToMany(db.user, {
  through: "usuario_permissoes",
});
db.user.belongsToMany(db.role, {
  through: "usuario_permissoes",
});

// User - Recommendation
db.userRecommendation = db.sequelize.define("usuario_recomendacao", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});
db.user.belongsToMany(db.recommendation, {
  through: "usuario_recomendacao",
});
db.recommendation.belongsToMany(db.user, {
  through: "usuario_recomendacao",
});

// Recommendation - Music
db.recomendationMusic = db.sequelize.define("recomendacao_musica", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});
db.recommendation.belongsToMany(db.music, {
  through: "recomendacao_musica",
});
db.music.belongsToMany(db.recommendation, {
  through: "recomendacao_musica",
});

// Recommendation - Artist
db.recomendationArtist = db.sequelize.define("recomendacao_artista", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});
db.recommendation.belongsToMany(db.artist, {
  through: "recomendacao_artista",
});
db.artist.belongsToMany(db.recommendation, {
  through: "recomendacao_artista",
});

// Genre - Music
db.genreMusic = db.sequelize.define("genero_musica", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});
db.genre.belongsToMany(db.music, {
  through: "genero_musica",
});
db.music.belongsToMany(db.genre, {
  through: "genero_musica",
});

// Genre - Artist
db.genreArtist = db.sequelize.define("genero_artista", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});
db.genre.belongsToMany(db.artist, {
  through: "genero_artista",
});
db.artist.belongsToMany(db.genre, {
  through: "genero_artista",
});

// Album - Music
db.album.hasMany(db.music);
db.music.belongsTo(db.album);

// Album - Artist
db.albumArtist = db.sequelize.define("album_artista", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});
db.album.belongsToMany(db.artist, {
  through: "album_artista",
});
db.artist.belongsToMany(db.album, {
  through: "album_artista",
});

//// *

db.ROLES = ["user", "admin", "artist"];

module.exports = db;
