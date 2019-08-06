const crypto = require('crypto');
const fs = require('fs');

exports.mongo = {
    mongo_id:'jckk7708',
    mongo_pw:'hyunsub123#'
};

exports.encryption = {
    createSalt:() => {
        const salt = crypto.randomBytes(64).toString('base64');
        return salt;
    },
    hashPassword:(password, salt) => {
        const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('base64');
        return key;
    }
};


/* module.exports = {
    mongo_id:'jckk7708',
    mongo_pw:'hyunsub123#',
    createSalt:() => {
        const salt = crypto.randomBytes(64).toString('base64');
        return salt;
    },
    hashPassword:(password, salt) => {
        const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('base64');
        return key;
    },
    renderHtml:(dir, html, res) => {
        fs.readFile(dir + `/${html}.html`, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }
}; */