const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const argon2 = require('argon2');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const config = require('../config');

// Models
const User = require('../models/user.model');

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email }, async function (err, user) {
            if (err) return done(null, false, "User not found")
            else {
                if (await argon2.verify(user.hashPassword, password)) 
                    return done(null, user)
                else 
                    return done(null, false, "incorrect username or password")
            }
        });
    })
)

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
},
    function (payload, done) {
        User.findOne({ email: payload.email }, function (err, user) {
            console.log(payload)
            if (err) {
                return done(null, false);
            }
            else {
                done(null, user)
            }
        })
    }));