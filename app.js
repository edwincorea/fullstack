var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var app = express();

app.use(favicon(path.join(__dirname, "public", "favicon.png")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// APIs
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bookshop");

var Book = require("./src/server/models/book");

// POST Book
app.post("/book", function(req, res) {
    var book = req.body;

    Book.create(book, function(err, books) {
        if(err) {
            throw err;
        }

        res.json(books);
    });
});

// GET Book
app.get("/book", function(req, res) {
    Book.find(function(err, books){
        if(err){
            throw err;
        }

        res.json(books);
    });
});

// Delete Book
app.delete("/book/:_id", function(req, res) {
    var query = {_id: req.params._id};

    Book.remove(query, function(err, books) {
        if(err) {
            throw err;
        }

        res.json(books);
    });

});


app.get("*", function(req, res){
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
