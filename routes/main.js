const Post = require('../schema/board');

exports.main = (req, res) => {
    Post.find({})
        .sort('createdAt')
        .then((result) => {
            res.render('index', { posts: result });
        }).catch((err) => {
            res.json(err);
        });
    console.log(`로그인 여부 : ${res.locals.isAuthenticated}`);
}