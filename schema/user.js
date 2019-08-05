const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String,unique: false, },
    id: { type: String,unique: true },
    password: { type: String, select: true },
    email: {type: String},
    salt: { type: String },
    createdAt:{ type:Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);