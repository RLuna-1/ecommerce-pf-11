const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Pago", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    metodo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // monto: {
    //   type: DataTypes.DECIMAL(10, 2),
    //   allowNull: false,
    // },
    // fecha: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    // estado: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
};
