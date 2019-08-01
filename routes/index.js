const router = require('express').Router();
const auth = require('./auth');
const main = require('./main');
const board = require('./board');

router.get('/', main.main);
router.get('/auth/signup', auth.signup);
router.post('/auth/signup', auth.signup_process);
router.get('/auth/login', auth.login);
router.post('/auth/login', auth.login_process.fuck);
router.get('/auth/logout', auth.logout);
router.get('/board/write', board.write);
router.post('/board/write', board.write_process);
router.get('/board/:postID', board.show);

module.exports = router;