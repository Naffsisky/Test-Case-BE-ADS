"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.hasMany(models.Leave, {
        foreignKey: "nomorInduk",
        as: "leaves",
        onDelete: "CASCADE",
      });
    }
  }
  Employee.init(
    {
      nomorInduk: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggalLahir: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      tanggalBergabung: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};