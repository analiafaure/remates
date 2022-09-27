'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Remates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fechaInicio: {
        type: Sequelize.DATE
      },
      fechaFin: {
        type: Sequelize.DATE
      },
      costoPuje: {
        type: Sequelize.DECIMAL
      },
      incrementoPuja: {
        type: Sequelize.DECIMAL
      },
      topePuje: {
        type: Sequelize.DECIMAL
      },
      activo: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Remates');
  }
};