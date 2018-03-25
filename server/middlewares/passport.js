var jwt = require('jsonwebtoken');
let models = require('../models');
var passportJWT = require("passport-jwt");
const _ = require('lodash');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/..\\config\\config.json')[env];

module.exports = (passport) => {
    
    var jwtOptions = {}
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('Authorization');
    jwtOptions.secretOrKey = config.secret;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
        return models.User.findOne({
            where: {
                id: jwt_payload.id
            }
        })
        .then( (user) => {
        if (user) {
            let minimalUser = _.pick(user, ['username', 'id']);
            next(null, minimalUser);
            } else {
            next(null, false);
            }
        })
        
    });
    
    passport.use(strategy);
}


    
