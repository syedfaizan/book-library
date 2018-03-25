var models = require('../models');
const Book = models.Book;
const _ = require('lodash');


var temp = {
    create : (body) => {
        let bookBody = _.pick(body, ['title', 'ISBN', 'UserId']);
        return Book.create(bookBody);
    },
    list: (params) => {
        let query = _.pick(params, ['title', 'ISBN', 'UserId']);
        return Book.findAll({
            where: query,
            include: 'User'
        });
    },
    read: (id) => {
        return Book.findById(id);
    },
    remove: (id) => {
        return Book.destroy({
            where: {
                id
            }
        });
    }
} 

module.exports = temp;