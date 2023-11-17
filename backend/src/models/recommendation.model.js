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
