const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Wishlist", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // Otros campos de la wishlist, si los hay
  });
};
