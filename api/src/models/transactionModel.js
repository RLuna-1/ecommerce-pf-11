const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Transaccion", {
    monto_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    items_vendidos: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
};

