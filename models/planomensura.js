'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlanoMensura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlanoMensura.hasMany(models.Lote,{
        foreignKey:'idPlanoMensura'
      })
    }
  }
  PlanoMensura.init({
    manzana: DataTypes.STRING,
    archivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PlanoMensura',
  });
  return PlanoMensura;
};