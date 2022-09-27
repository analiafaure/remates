'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Remate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Remate.hasMany(models.RemateLote,{
        foreignKey:'id'
      })
      Remate.hasMany(models.Oferta,{
        foreignKey:'idRemate'
      })      
    }
  }
  Remate.init({
    descripcion: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    costoPuja: DataTypes.DECIMAL,
    incrementoPuja: DataTypes.DECIMAL,
    topePuja: DataTypes.DECIMAL,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Remate',
  });
  return Remate;
};