const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Platform = sequelize.define("platform", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
  });

  return Platform;
};