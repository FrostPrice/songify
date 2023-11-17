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
