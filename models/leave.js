"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Leave.belongsTo(models.Employee, {
        foreignKey: "nomorInduk",
        as: "employee",
      });
    }
  }
  Leave.init(
    {
      nomorInduk: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      tanggalCuti: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      lamaCuti: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      keterangan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Leave",
    }
  );
  return Leave;
};
