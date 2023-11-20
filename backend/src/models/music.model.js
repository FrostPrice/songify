module.exports = (sequelize, Sequelize) => {
  const Music = sequelize.define("Musica", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      field: "nome",
      allowNull: false,
    },
    duration: {
      type: Sequelize.FLOAT,
      field: "duracao",
      allowNull: false,
    },
    releaseDate: {
      type: Sequelize.DATE,
      field: "data_lancamento",
      allowNull: false,
    },
  });

  return Music;
};
//
// * SQL Script:
// create table "Musicas" (
//   id serial primary key,
//   nome varchar(50) not null,
//   duracao double precision not null,
//   data_lancamento timestamp with time zone not null,
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null,
//   "AlbumId" integer references "Albums" on update cascade on delete
//   set null
// );
