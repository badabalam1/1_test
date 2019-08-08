const mongoose = require('mongoose');

const { Schema } = mongoose;

const boardSchema = new Schema({
    title: { type: String, required: true },
    contents : { type: String, required: true },
    author : { type: String, required: true },
    createAt: {  type: Date, default: Date.now },
    commentCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('board', boardSchema);