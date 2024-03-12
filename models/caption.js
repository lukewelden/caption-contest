'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Image}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
      this.belongsTo(Image, { foreignKey: 'image_id' })
    }

    toJSON() {
      return { ...this.get(), id: undefined, user_id: undefined }
    }
  }
  Caption.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'captions',
    modelName: 'Caption',
  });
  return Caption;
};