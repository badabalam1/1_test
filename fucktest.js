const crypto = require('crypto');

 /* const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
    return {salt, hash};
}

console.log(hashPassword('groot').hash);
 */


const password = 'groot';
let salt;
let cryp_pw;

crypto.randomBytes(64, (err, buf) => {
    crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
        cryp_pw = key.toString('base64');
    });
});



/* const fuck = (pw) => { crypto.randomBytes(64, (err, buf) => {
    const result = crypto.pbkdf2(pw, buf.toString('base64'), 100000, 64, 'sha512', () => {return result});
});}

const _pw = fuck(password);

console.log(_pw); */