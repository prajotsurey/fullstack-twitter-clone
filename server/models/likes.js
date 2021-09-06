'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.belongsToMany(models.user, {through: models.likes, foreignKey: 'post_id',as:'liker'});
      models.user.belongsToMany(models.post, {through: models.likes, foreignKey:'user_id',as:'liked_post'});
      

    }
  };
  likes.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  }, {
    indexes:[
      {
        unique: true,
        fields: ['user_id', 'post_id']
      }
    ],
    sequelize,
    modelName: 'likes',
  });
  return likes;
};