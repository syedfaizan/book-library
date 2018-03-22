'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    ISBN: {
      type: DataTypes.INTEGER,
      unique: true
    },
    UserId: DataTypes.INTEGER
  }, {});
  Book.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.User);
    this.hasMany(models.Review);
  };
  return Book;
};