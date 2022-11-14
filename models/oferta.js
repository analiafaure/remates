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
        target_key:'RemateId'
      }) 
      Oferta.belongsTo(models.Lote,{
        foreignkey:'id',
        target_key:'LoteId'
      })
      Oferta.belongsTo(models.Usuario,{
        foreignkey:'id',
        target_key:'UsuarioId'
      }) 
    }
  }
  Oferta.init({
    RemateId: DataTypes.INTEGER,
    LoteId: DataTypes.INTEGER,
    UsuarioId: DataTypes.INTEGER,
    valorOferta: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Oferta',
  });
  return Oferta;
};