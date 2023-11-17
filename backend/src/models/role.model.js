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
