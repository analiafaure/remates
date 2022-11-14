'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Oferta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RemateId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Remate',
          key: 'id'
        }
      },
      LoteId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Lote', // 'Movies' would also work
          key: 'id'
        }
      },
      UsuarioId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Usuario', // 'Movies' would also work
          key: 'id'
        }
      },
      valorOferta: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Oferta');
  }
};