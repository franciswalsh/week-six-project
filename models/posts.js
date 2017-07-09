'use strict';
module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('Posts', {
    postcontent: DataTypes.STRING,
    numberoflikes: DataTypes.INTEGER,
    username: DataTypes.STRING
  }, {});

    Posts.associate = function(models){
      Posts.belongsTo(models.Users, {as: 'UserWhoPosted', foreignKey: 'userid'});
      Posts.belongsToMany(models.Users, {as: 'LikingUsers', through: models.Likes, foreignKey: 'postid', otherKey: 'userid'})
    }
  return Posts;
};
