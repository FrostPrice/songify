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
