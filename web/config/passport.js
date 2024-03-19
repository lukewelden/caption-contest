const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../database/models');
const { validatePassword } = require('../utils/passwords');

const verifyCallback = (username, password, done) => {
    console.log('Verifying user...');
    // Search the database for a user with the username provided
    User.findOne({ where: { username } })
        .then((user) => {
            console.log(user);
            // Does the user exist?
            if (!user) {
                console.log('User not found');
                return done(null, false);
            }
            // Check if the password is valid
            console.log('Validating password...');
            const isValid = validatePassword(password, user.password, user.salt); 
            // If the password is valid, return the user
            if (isValid) {
                console.log('Password is valid');
                return done(null, user);
            } else {
                console.log('Password is invalid');
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.uuid);
});

passport.deserializeUser((uuid, done) => {
    User.findOne({ where: { uuid } })
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});