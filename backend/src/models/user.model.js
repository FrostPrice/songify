module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Usuario", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(50),
      field: "nome",
      allowNull: false,
      unique: true,
    },
    age: {
      type: Sequelize.INTEGER,
      field: "idade",
      allowNull: false,
    },
    musical_preference: {
      type: Sequelize.STRING(50),
      field: "preferencia_musical",
    },
    email: {
      type: Sequelize.STRING(50),
      field: "email",
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      field: "senha",
      allowNull: false,
    },
  });

  return User;
};
//
// * SQL Script:
// create table "Usuarios" (
//   id serial primary key,
//   nome varchar(50) not null unique,
//   idade integer not null,
//   preferencia_musical varchar(50),
//   email varchar(50) not null unique,
//   senha varchar(255) not null,
//   "createdAt" timestamp with time zone not null,
//   "updatedAt" timestamp with time zone not null
// );
