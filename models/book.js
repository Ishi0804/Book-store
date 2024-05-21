const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    coverImage: String
});

module.exports = mongoose.model('Book', bookSchema);
