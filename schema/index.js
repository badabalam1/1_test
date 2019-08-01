const mongoose = require('mongoose');
const lib = require('../lib/lib');
let url = `mongodb://${lib.mongo_id}:${lib.mongo_pw}@localhost:27017/admin`;

exports.mongoConnect = () => {
    const connect = () => {
        if(process.env.NODE_ENV !== 'production') {
            mongoose.set('debug',true);
        }
        mongoose.connect(url, {
            dbName:'nodejs',
            useNewUrlParser: true,
            useCreateIndex : true,
        }, (err) => {
            if (err) {
                console.log('✗ DB connection error.', err);
            } else {
                console.log('✓ DB connection success.');
            }
        });
    };
    connect();
    mongoose.connection.on('err', (err) => {
        console.error('✗ DB connection error.', err)
    });
    mongoose.connection.on('disconnected', (err) => {
        console.error('mongo disconnected');
        connect();
    });
    require('./user');
    require('./board');
};