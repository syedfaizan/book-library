var models = require('../models');
const Book = models.Book;

var temp = {
    create : (book) => {
        return Book.create(book);
    },
    list: () => {
        return Book.findAll();
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