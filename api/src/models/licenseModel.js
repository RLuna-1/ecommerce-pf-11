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
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  License.prototype.softDelete = async function () {
    this.deleted = true;
    await this.save();
  };

  return License;
};
