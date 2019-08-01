const User = require('../schema/user');
const lib = require('../lib/lib');
const passport = require('../lib/passport');

exports.signup = (req, res) => {
    res.render('signup');
};

exports.signup_process = (req, res) => {
    let body = req.body;
    const _salt = lib.createSalt();
    const afterHash = lib.hashPassword(body.password, _salt);
    const user = new User({
        name: body.name,
        id: body.id,
        password: afterHash,
        email: body.email,
        salt: _salt,
    });
    user.save()
        .then((result) => {
            res.render('afterComplate', { title: "회원가입 완료" });
        })
        .catch((err) => {
            console.error(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`
            <head><meta charset="utf-8"</head>
            <body><h2>회원가입 실패</h2></body>
            <a href="/">메인으로 돌아가기</a>
            `);
            next(err);
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