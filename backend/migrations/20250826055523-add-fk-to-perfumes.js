'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Perfumes', 'type_id', {
      type: Sequelize.INTEGER,
      references: { model: 'Types', key: 'id' }
    });

    await queryInterface.addColumn('Perfumes', 'season_id', {
      type: Sequelize.INTEGER,
      references: { model: 'Seasons', key: 'id' }
    });

    await queryInterface.addColumn('Perfumes', 'gender_id', {
      type: Sequelize.INTEGER,
      references: { model: 'Genders', key: 'id' }
    });

    await queryInterface.addColumn('Perfumes', 'concentration_id', {
      type: Sequelize.INTEGER,
      references: { model: 'Concentrations', key: 'id' }
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Perfumes', 'type_id');
    await queryInterface.removeColumn('Perfumes', 'season_id');
    await queryInterface.removeColumn('Perfumes', 'gender_id');
    await queryInterface.removeColumn('Perfumes', 'concentration_id');
  }
};