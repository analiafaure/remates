'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oferta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Oferta.belongsTo(models.Remate,{
        foreignkey:'id',
        target_key:'idRemate'
      }) 
      Oferta.belongsTo(models.Lote,{
        foreignkey:'id',
        target_key:'idLote'
      }) 
    }
  }
  Oferta.init({
    idRemate: DataTypes.INTEGER,
    idLote: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    valorOferta: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Oferta',
  });
  return Oferta;
};