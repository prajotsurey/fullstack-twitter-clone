'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.belongsTo(models.user, {foreignKey: 'user_id',as:'creator'})
      post.belongsToMany(models.user, {through: models.likes, foreignKey: 'post_id',as:'likers'})
      post.belongsToMany(models.user, {through: models.bookmarks, foreignKey: 'post_id',as:'bookmarkers'})
    }
  };
  post.init({
    content: DataTypes.STRING,
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};