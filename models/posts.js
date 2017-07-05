'use strict';
module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('Posts', {
    postcontent: DataTypes.STRING,
    numberoflikes: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Posts;
};
