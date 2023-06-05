const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const License = sequelize.define("license", {
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

  return License;
};