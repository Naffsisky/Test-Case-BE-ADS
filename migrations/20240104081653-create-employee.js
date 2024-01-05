'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      nomorInduk: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      alamat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tanggalLahir: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      tanggalBergabung: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  }
};