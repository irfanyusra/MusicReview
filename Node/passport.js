const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const argon2 = require('argon2');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const config = require('./config');

// Models
const User = require('./models/user.model');

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email }, async function (err, user) {
            if (err) {
                console.log(`from passprt: ${err}`);
                return done(null, false, `from passprt: ${err}`);
            }
            else {
                if (!user) return done(null, false); //username doesnt exist
                else if (await argon2.verify(user.hashPassword, password)) return done(null, user); //all good 
                else return done(null, false); //pass wrong 
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
            console.log(payload);
            if (err) return done(null, false);
            else return done(null, user);
        
        });
    }));