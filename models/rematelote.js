'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RemateLote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RemateLote.belongsTo(models.Remate,{
        foreignkey:'id',
        target_key:'RemateId'
      }) 
      RemateLote.belongsTo(models.Lote,{
        foreignkey:'id',
        target_key:'LoteId'
      })     
    }
  }
  RemateLote.init({
    RemateId: DataTypes.INTEGER,
    LoteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RemateLote',
  });
  return RemateLote;
};