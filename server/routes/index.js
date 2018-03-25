const passport = require('passport');
var booksRouter = require('./book');
var usersRouter = require('./user');
var reviewRouter = require('./review');

module.exports = app => {
    app.use('/api/book', passport.authenticate('jwt', { session: false }) , booksRouter);
    app.use('/api/review',passport.authenticate('jwt', { session: false }), reviewRouter); 
    app.use('/api/user', usersRouter); 
}