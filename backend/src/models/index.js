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

// * User - Role
// create table usuario_permissoes (
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null,
//   "PermissoId" integer not null references "Permissoes" on update cascade on delete cascade,
//   "UsuarioId" integer not null references "Usuarios" on update cascade on delete cascade,
//   primary key ("PermissoId", "UsuarioId")
// );
db.userPermissions = db.sequelize.define("usuario_permissoes");
db.role.belongsToMany(db.user, {
  through: "usuario_permissoes",
});
db.user.belongsToMany(db.role, {
  through: "usuario_permissoes",
});

// * User - Recommendation
// create table usuario_recomendacaos (
//   id serial primary key,
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null,
//   "UsuarioId" integer references "Usuarios" on update cascade on delete cascade,
//   "RecomendacaoId" integer references "Recomendacaos" on update cascade on delete cascade,
//   unique ("UsuarioId", "RecomendacaoId")
// );
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

// * Recommendation - Music
// create table recomendacao_musicas (
//   id serial primary key,
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null,
//   "RecomendacaoId" integer references "Recomendacaos" on update cascade on delete cascade,
//   "MusicaId" integer references "Musicas" on update cascade on delete cascade,
//   unique ("RecomendacaoId", "MusicaId")
// );
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

// * Recommendation - Artist
// create table recomendacao_artista (
//   id serial primary key,
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null,
//   "RecomendacaoId" integer references "Recomendacaos" on update cascade on delete cascade,
//   "ArtistumId" integer references "Artista" on update cascade on delete cascade,
//   unique ("RecomendacaoId", "ArtistumId")
// );
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

// * Genre - Music
// create table genero_musicas (
//   id serial primary key,
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null,
//   "GeneroId" integer references "Generos" on update cascade on delete cascade,
//   "MusicaId" integer references "Musicas" on update cascade on delete cascade,
//   unique ("GeneroId", "MusicaId")
// );
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

// * Genre - Artist
// create table genero_artista (
//   id serial primary key,
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null,
//   "GeneroId" integer references "Generos" on update cascade on delete cascade,
//   "ArtistumId" integer references "Artista" on update cascade on delete cascade,
//   unique ("GeneroId", "ArtistumId")
// );
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

// * Album - Music
// Aqui se cria orelacionamento entre Album e Music
// O album pode ter muitas musicas
// A musica pode ter apenas um album ou nenhum, cria-se uma chave estrangeira na tabela musica (albumId)
db.album.hasMany(db.music);
db.music.belongsTo(db.album);

// * Album - Artist
// CREATE TABLE album_artista (
//   id serial PRIMARY KEY,
//   "createdAt" timestamp WITH TIME ZONE NOT NULL,
//   "updatedAt" timestamp WITH TIME ZONE NOT NULL,
//   "AlbumId" integer REFERENCES "Albums" ON UPDATE CASCADE ON DELETE CASCADE,
//   "ArtistumId" integer REFERENCES "Artista" ON UPDATE CASCADE ON DELETE CASCADE,
//   UNIQUE ("AlbumId", "ArtistumId")
// );
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
