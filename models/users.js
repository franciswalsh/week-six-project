'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayname: DataTypes.STRING
  }, {});

  Users.associate = function(models){
    Users.hasMany(models.Likes, {as: 'LikesByUser', foreignKey: 'userid'});
    Users.hasMany(models.Posts, {as: 'UserPosts', foreignKey: 'userid'});
    Users.belongsToMany(models.Posts, {as: 'LikedPost', through: models.Likes, foreignKey: 'userid', otherKey: 'postid'})
  }
  return Users;
};
