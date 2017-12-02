var mongoose = require("mongoose");

var bookSchema = mongoose.Schema({
    title: String,
    description: String,
    images: String,
    price: Number
});

var Book = mongoose.model("Book", bookSchema);
module.exports = Book;