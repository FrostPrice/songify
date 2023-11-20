module.exports = (sequelize, Sequelize) => {
  const Artist = sequelize.define("Artista", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      field: "nome",
      allowNull: false,
      unique: true,
    },
    age: {
      type: Sequelize.INTEGER,
      field: "idade",
      allowNull: false,
    },
  });

  return Artist;
};
//
// * SQL Script:
// create table "Artista" (
//   id serial primary key,
//   nome varchar(255) not null unique,
//   idade integer not null,
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null
// );
