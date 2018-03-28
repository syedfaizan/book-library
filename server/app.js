var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var models = require('./models');
var passport = require("passport");
const jwtStratergy = require('./middlewares/passport');

jwtStratergy(passport);

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use((req, res, next) => {
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
      return res.send(Object.assign(defaulSuccesstResponse, {data: {items: payload}, length: payload.length}));
    }
    return res.send(defaulSuccesstResponse);
  }
  next();
});

require('./routes')(app);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({ message: err.message, errors: err.errors });
})

module.exports = app;
