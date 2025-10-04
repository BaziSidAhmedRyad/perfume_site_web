'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Perfumes', 'moment_id', {
      type: Sequelize.INTEGER,
      references: { model: 'Moments', key: 'id' }
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Perfumes', 'moment_id');
  }
};