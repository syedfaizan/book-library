'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.Review);
    this.hasMany(models.Book);
  };
  return user;
};