const Post = require('../schema/board');
let postCount = 0;

exports.main = (req, res) => {
    Post.find({})
        .then((result) => {
            postCount = result.length;
        }).catch((err) => {
            res.json(err);
        });
    let pageID = req.query.page === undefined || req.query.page < 1 ? 1 : req.query.page
    Post.find({})
        .sort('-createAt')
        .skip( (pageID - 1 ) * 10)
        .limit(pageID * 10)
        .then((result) => {
            res.render('index', { posts: result, pageLength: ((Math.ceil(postCount / 10)) * 10 ) / 10 });
        }).catch((err) => {
            res.json(err);
        });
    console.log(`로그인 여부 : ${res.locals.isAuthenticated}`);
}