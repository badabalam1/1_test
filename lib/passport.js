const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../schema/user');
const lib = require('./lib');

passport.serializeUser((user, done) => {
    console.log('✓ serialize', user);
    done(null, user.id);
});

passport.deserializeUser((_id, done) => {
    console.log('✓ deserialize', _id);
    User.findOne({ id: _id })
        .then((user) => {
            done(null, user)
        }).catch((err) => {
            done(null, err);
        });
});
passport.use(new LocalStrategy(
{
    usernameField: 'username',
    passwordField: 'password'
},
(username, password, done) => {
    // console.log('✓ LocalStrategy', username, password);
    User.findOne({ id: username })
        .then((result) => {
            const afterHash = lib.hashPassword(password, result.salt);
            if (result.password === afterHash) {
                console.log(`✓ Login Success |||| ID : ${result.id}  PW : ${afterHash}`);
                return done(null, result, {message: 'Login Success !!'});
            } else {
                return done(null, false, { message: 'Incorrect Password !!'});
            }
        }).catch((err) => {
            return done(null, false, { message: 'Incorrect ID !!'});
        });
}
)); 

module.exports = passport;