'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RemateLotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idRemate: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Remate',
          key: 'id'
        }  
      },
      idLote: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Lote',
          key: 'id'
        }
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
    await queryInterface.dropTable('RemateLotes');
  }
};