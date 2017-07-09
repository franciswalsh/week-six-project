'use strict';
module.exports = function(sequelize, DataTypes) {
  var Likes = sequelize.define('Likes', {
  }, {});

  Likes.associate = function(models){
    Likes.belongsTo(models.Users, {as: 'UserWhoLiked', foreignKey: 'userid'});
    Likes.belongsTo(models.Posts, {as: 'PostThatWasLiked', foreignKey: 'postid'})
  }

  return Likes;
};
