'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partidaInmobiliaria: {
        type: Sequelize.STRING
      },
      idPlanoMensura: {
        type: Sequelize.INTEGER,
        references:{
          model: 'PlanoMensura',
          key: 'id'
        }
      },
      descripcion: {
        type: Sequelize.STRING
      },
      costoInicial: {
        type: Sequelize.DECIMAL
      },
      vendido: {
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
    await queryInterface.dropTable('Lotes');
  }
};