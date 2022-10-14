'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      dni: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      clave: {
        type: Sequelize.STRING
      },
      tipoUsuario: {
        type: Sequelize.INTEGER
      },
      celular: {
        type: Sequelize.STRING
      },
      reinicioClave: {
        type: Sequelize.BOOLEAN
      },
      activo: {
        type: Sequelize.BOOLEAN
      },
      primerLogin: {
        type: Sequelize.BOOLEAN
      },
      aceptoBases: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Usuarios');
  }
};