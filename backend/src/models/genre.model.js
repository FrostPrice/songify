module.exports = (sequelize, Sequelize) => {
  const Genre = sequelize.define("Genero", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      field: "nome",
      allowNull: false,
      unique: true,
    },
  });

  return Genre;
};
//
// * SQL Script:
// create table "Generos" (
//   id serial primary key,
//   nome varchar(50) not null unique,
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null
// );
