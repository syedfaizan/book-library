var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var models = require('./models');

// var indexRouter = require('./routes/index');
var booksRouter = require('./routes/book');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.preparePayload = payload => {
    let defaulSuccesstResponse = {
      data: payload,
      status: "success"
    }
    let defaultErrorResponse = {
      status: "error",
      message: "Item not found or error occured!"
    }
    
    if(payload == null){
      return res.send(defaultErrorResponse);
    }

    if(Array.isArray(payload)){
      return res.send(Object.assign(defaulSuccesstResponse, {data: {items: payload}}));
    }
    return res.send(defaulSuccesstResponse);
  }
  next();
});

app.use('/api/books', booksRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.message);
})

module.exports = app;
