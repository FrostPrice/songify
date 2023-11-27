module.exports = (sequelize, Sequelize) => {
  const Recommendation = sequelize.define("Recomendacao", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      field: "nome",
    },
    type: {
      type: Sequelize.STRING(50),
      field: "tipo",
    },
  });

  return Recommendation;
};
//
// * SQL Script:
// create table "Recomendacao" (
//   id serial primary key,
//   nome varchar(50),
//   tipo varchar(50),
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null
// );
