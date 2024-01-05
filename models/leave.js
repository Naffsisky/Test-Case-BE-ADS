"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
    static associate(models) {
      Leave.belongsTo(models.Employee, {
        foreignKey: "nomorInduk",
        as: "employee",
        onDelete: "CASCADE",
      });
    }
  }
  Leave.init(
    {
      nomorInduk: {
        type: DataTypes.STRING,
        allowNull: false,
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
