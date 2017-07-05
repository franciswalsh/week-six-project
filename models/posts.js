'use strict';
module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('Posts', {
    postcontent: DataTypes.STRING,
    numberoflikes: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    username: DataTypes.STRING
  }, {});

    Posts.associate = function(models){
      Posts.belongsTo(models.Users, {as: 'Users', foreignKey: 'userid'})
    }
  return Posts;
};
