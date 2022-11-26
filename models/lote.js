'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lote.belongsToMany(models.Remate, 
        { through: 'Oferta' })
      Lote.belongsToMany(models.Remate, 
        { through: 'RemateLote' })
      Lote.belongsTo(models.PlanoMensura,{
        foreignKey:'id',
        target_key:'idPlanoMensura'
      })
      
    }
  }
  Lote.init({
    partidaInmobiliaria: DataTypes.STRING,
    idPlanoMensura: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    costoInicial: DataTypes.DECIMAL,
    vendido: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Lote',
  });
  return Lote;
};