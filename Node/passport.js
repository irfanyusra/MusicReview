const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const argon2 = require('argon2');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const config = require('./config');

const jsonwebtoken = require('jsonwebtoken');
const FacebookTokenStrategy = require('passport-facebook-token');

// Models
const User = require('./models/user.model');

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email }, async function (err, user) {
            if (err) {
                console.log(`from passprt: ${err}`);
                return done(null, false, {error:`from passprt: ${err}`});
            }
            else {
                if (!user) return done(null, false,{msg: "username doesnt exist"}); //username doesnt exist
                else if (await argon2.verify(user.hashPassword, password)) return done(null, user); //all good 
                else return done(null, false, { msg: "password wrong" }); //pass wrong 
            }
        });
    })
)

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
},
    function (payload, done) {
        User.findOne({ email: payload.email }, function (error, user) {
            console.log(payload);
            if (error) return done(null, false);
            else return done(null, user);

        });
    }));

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const user = new User({
            method: 'facebook',
            facebook: {
                // id: profile.id,
name: profile.displayName,
                email: profile.emails[0].value
            }
        });

        await user.save();
        done(null, user);
    } catch (error) {
        done(error, false, error.message);
    }
}));
