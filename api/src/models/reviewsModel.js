const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define("review", {
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  Review.prototype.softDelete = async function () {
    if (this.deleted === true) {
      this.deleted = false;
      await this.save()
      return;
    }

    this.deleted = true;
    await this.save();
  };
};
