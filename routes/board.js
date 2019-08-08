const User = require('../schema/user');
const Post = require('../schema/board');
const Comment = require('../schema/comment');

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
    post.save()
        .then((result) => {
            res.redirect(`/board/${result._id}`);
        })
        .catch((err) => {
            res.json(err);
        });
};

exports.showPost = (req, res) => {
    let _postCount;
    let _pageLength;
    let _posts;
    let _comments;
    Post.find({})
        .then((result) => {
            _postCount = result.length;
        }).catch((err) => {
            res.json(err);
        });
    let pageID = req.query.page === undefined || req.query.page < 1 ? 1 : req.query.page
    Post.find({})
        .sort('-createAt')
        .skip( (pageID - 1 ) * 10)
        .limit(pageID * 10)
        .then((result) => {
            _posts = result;
            _pageLength = (((Math.ceil(_postCount / 10)) * 10 ) / 10) ;
        }).catch((err) => {
            res.json(err);
        });
    Comment.find({ connectedPost: req.params.postID })
        .then((findedComments) => {
            _comments = findedComments;
            console.log(findedComments);
        }).catch((err) => {
            res.json(err);
        });
    Post.findOne({ _id: req.params.postID })
        .then((result) => {
            res.render('showPost', { post: result, posts: _posts, pageLength: _pageLength, comments: _comments});
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

exports.writeComment = (req, res) => {
    let postID = req.query.postID;
    let body = req.body;
    const comment = new Comment({
        Author: req.user.name,
        comment: body.comment,
        connectedPost: postID,
    });
    comment.save()
        .then((result) => {
            Post.findOneAndUpdate({ _id: postID }, { $inc : { commentCount : 1 }})
                .then((result) => {
                }).catch((err) => {
                    res.json(err);
                });
            res.redirect(`/board/${postID}`);
        }).catch((err) => {
            res.json(err);
        });
};

exports.deleteComment = (req, res) => {
    // let commentID = req.params.commentID;
    let commentID = req.query.commentID;
    console.log('delete Comment inside');
    console.log(commentID);
    /* Comment.deleteOne({ _id: commentID })
        .then((result) => {
            post.findOneAndUpdate({ _id: postID }, { total: { $gte: 1 } }, { $inc: { total: -1 }})
                .then((result) => {
                }).catch((err) => {
                    res.json(err);
                });
            res.redirect('/board/${postID}');
        }).catch((err) => {
            res.json(err);
        }); */
};