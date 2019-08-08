const router = require('express').Router();
const auth = require('./auth');
const main = require('./main');
const board = require('./board');
const user = require('./user');

// all user
router.get('/', main.main);
router.get('/auth/signup', auth.signup);
router.post('/auth/signup', auth.signup_process);
router.get('/auth/login', auth.login);
router.post('/auth/login', auth.login_process.fuck);
router.get('/auth/logout', auth.logout);
// only member
router.get('/board/write', board.write);
router.post('/board/write', board.write_process);
router.post('/board/:postID')
router.get('/board/:postID', board.showPost);
// only Author
router.get('/board/edit/:postID', board.editPost);
router.put('/board/update/:postID', board.updatePost);
router.delete('/board/delete/:postID', board.deletePost);
// only member
router.get('/user/information', user.information);
// only Admin
router.get('/user/members', user.members);
router.put('/user/modify/:userID', user.modifyUser)
router.delete('/user/delete/:userID', user.deleteUser)

module.exports = router;