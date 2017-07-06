'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayname: DataTypes.STRING
  }, {});

  Users.associate = function(models){
    Users.belongsToMany(models.Likes, {through: models.Likes})
  }
  return Users;
};
