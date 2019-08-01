const mongoose = require('mongoose');

const { Schema } = mongoose;
const getCurrentDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let today = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();

    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
};
const userSchema = new Schema({
    name: { type: String,unique: false, },
    id: { type: String,unique: true },
    password: { type: String, select: true },
    email: {type: String},
    salt: { type: String },
    createdAt:{ type:Date, default:getCurrentDate() },
});

module.exports = mongoose.model('user', userSchema);