'use strict';
module.exports = (sequelize, DataTypes) => {
  var reviews = sequelize.define('Review', {
    comment: DataTypes.STRING,
    rating: DataTypes.ENUM(1,2,3,4,5),
    UserId: DataTypes.INTEGER,
    ReviewId: DataTypes.INTEGER
  }, {});
  reviews.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.User);
    this.belongsTo(models.Book);
  };
  return reviews;
};