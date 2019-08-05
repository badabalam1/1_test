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
            res.redirect(`/board/${result._id}`);
        })
        .catch((err) => {
            res.json(err);
        });
};

exports.showPost = (req, res) => {
    console.log('✓ fucking show post');
    Post.findOne({ _id: req.params.postID })
        .then((result) => {
            res.render('showPost', { post: result });
        }).catch((err) => {
            res.json(err);
        });
};

exports.editPost = (req, res) => {
    console.log('✓ UPDATE POST');
    Post.findOne({ _id: req.params.postID })
    .then((result) => {
        res.render('editPost', { post: result });
    }).catch((err) => {
        res.json(err);
    });
};

exports.updatePost = (req, res) => {
    req.body.createAt = Date.now(); // 2
    Post.findOneAndUpdate({ _id: req.params.postID }, req.body)
        .then((updateResult) => {
            res.redirect(`/board/${req.params.postID}`);
        }).catch((err) => {
            res.json(err);
        });
};

exports.deletePost = (req, res) => {
    Post.deleteOne({ _id: req.params.postID })
        .then((result) => {
            res.redirect('/');
        }).catch((err) => {
            res.json(err);
        });
};