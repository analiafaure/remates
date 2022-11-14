'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsToMany(models.Remate,{ through: 'Oferta' })
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.STRING,
    email: DataTypes.STRING,
    clave: DataTypes.STRING,
    tipoUsuario: DataTypes.INTEGER,
    celular: DataTypes.STRING,
    reinicioClave: DataTypes.BOOLEAN,
    activo: DataTypes.BOOLEAN,
    primerLogin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};