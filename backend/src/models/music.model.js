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
