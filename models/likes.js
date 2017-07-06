'use strict';
module.exports = function(sequelize, DataTypes) {
  var Likes = sequelize.define('Likes', {
    postid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});

  Likes.associate = function(models){
    Likes.belongsTo(models.Users, {as: 'Users', foreignKey: 'userid'})
  }
  Likes.associate = function(models){
    Likes.belongsTo(models.Posts, {as: 'Posts', foreignKey: 'postid'})
  }

  return Likes;
};
