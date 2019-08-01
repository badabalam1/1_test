const User = require('../schema/user');
const Post = require('../schema/board');

exports.write = (req, res) => {
    res.render('postWrite');
};

exports.write_process = (req, res) => {
    let body = req.body;
    const post = new Post ({
        title: body.title,
        contents: body.contents,
        author: req.user.name,
    });
    console.log(post);
    post.save()
        .then((result) => {
            //res.render('afterComplate', { title: "글 작성 완료" });
            res.redirect(`/board/${result._id}`);
        })
        .catch((err) => {
            console.error(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`
            <head><meta charset="utf-8"</head>
            <body><h2>글 작성 실패</h2></body>
            <a href="/">Main</a>
            `);
            next(err);
        });
};

exports.show = (req, res) => {
    console.log('✓ fucking show post');
    Post.findOne({ _id: req.params.postID })
        .then((result) => {
            console.log(result);
            res.render('showPost', { post: result, data: 'a' });
        }).catch((err) => {
            res.json(err);
        });
};