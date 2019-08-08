const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    Author: {type: String, required: true },
    comment: { type: String, required: true },
    connectedPost: { type: String },
    createdAt: { type:Date, default: Date.now },
});

module.exports = mongoose.model('comment', commentSchema);