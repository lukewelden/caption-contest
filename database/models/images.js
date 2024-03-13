'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Caption}) {
      // define association here
      this.hasMany(Caption, { foreignKey: 'image_id', as: 'captions'})
    }
  }
  Image.init({
    image: {
      type: DataTypes.BLOB, 
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'images',
    modelName: 'Image',
  });
  return Image;
};