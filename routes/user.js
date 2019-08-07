const User = require('../schema/user');

exports.members = (req, res) => {
    User.find({})
        .then((result) => {
            res.render('admin_members', {users: result});
        }).catch((err) => {
            res.json(err);
        });
};

exports.information = (req, res) => {
    res.render('showInformation', { user: req.user });
};

exports.modifyUser = (req, res) => {
    req.body.createAt = Date.now();
    Post.findOneAndUpdate({ _id: req.params.userID }, req.body)
        .then((updateResult) => {
            res.redirect(`/user/members`);
        }).catch((err) => {
            res.json(err);
        });
};

exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.userID })
        .then((result) => {
            res.redirect('/user/members');
        }).catch((err) => {
            res.json(err);
        });
};