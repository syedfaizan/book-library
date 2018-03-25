var models = require('../models');
const Review = models.Review;
const _ = require('lodash');


var temp = {
    create : (body) => {
        let reviewBody =_.pick(body, ['comment', 'rating', 'UserId', 'BookId']);
        return Review.create(reviewBody);
    },
    list: (params) => {
        let query = _.pick(params, ['comment', 'rating', 'UserId', 'BookId']);
        return Review.findAll({
            where: query,
            include: ['User', 'Book']
        });
    }
} 

module.exports = temp;