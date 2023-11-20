module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("Permissoes", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      field: "nome",
      allowNull: false,
    },
  });

  return Role;
};
//
// * SQL Script:
// create table "Permissoes" (
//   id serial primary key,
//   nome varchar(255) not null,
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null
// );
