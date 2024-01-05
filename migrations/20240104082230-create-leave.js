'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leaves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomorInduk: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Employees',
          key: 'nomorInduk'
        },
        onDelete: 'CASCADE'
      },
      tanggalCuti: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      lamaCuti: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      keterangan: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Leaves');
  }
};