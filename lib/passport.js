const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../schema/user');
const { encryption } = require('../lib/lib');

passport.serializeUser((user, done) => {
    console.log(`✓ serialize, USER ID : ${user.id}`);
    done(null, user.id);
});

passport.deserializeUser((_id, done) => {
    console.log(`✓ deserialize, USER ID : ${_id}`);
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
            const afterHash = encryption.hashPassword(password, result.salt);
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