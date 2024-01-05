'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Employees', 'tanggalLahir', {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.changeColumn('Employees', 'tanggalBergabung', {
      type: Sequelize.DATEONLY,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Employees', 'tanggalLahir', {
      type: Sequelize.DATE,
    });
    await queryInterface.changeColumn('Employees', 'tanggalBergabung', {
      type: Sequelize.DATE,
    });
  }
};
