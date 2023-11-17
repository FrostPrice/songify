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
