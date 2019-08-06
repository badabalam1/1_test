const User = require('../schema/user');
const { encryption } = require('../lib/lib');
const passport = require('../lib/passport');

exports.signup = (req, res) => {
    res.render('signup');
};

exports.signup_process = (req, res) => {
    let body = req.body;
    const _salt = encryption.createSalt();
    const afterHash = encryption.hashPassword(body.password, _salt);
    const user = new User({
        name: body.name,
        id: body.id,
        password: afterHash,
        email: body.email,
        salt: _salt,
    });
    user.save()
        .then((result) => {
            // res.render('afterComplate', { title: "회원가입 완료" });
            res.redirect('/');
        })
        .catch((err) => {
            res.json(err);
        });
};

exports.login = (req, res) => {
    res.render('login');
};

exports.login_process =  {   
        fuck: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: 'Invalid username or password.',
        successFlash: 'Welcome!'
    }),
};

exports.logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
      res.redirect('/');
    });
};