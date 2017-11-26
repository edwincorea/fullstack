var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bookshop");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "# MongoDB - connection error: "));

// Set Up Sessions
app.use(session({
    secret: "mySecretString",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 *60 * 24 * 2 // 2 days in ms
    },
    store: new MongoStore({
        mongooseConnection: db,
        ttl: 2 * 24 * 60 * 60 //ttl: 2 days * 24 hours * 60 minutes * 60 seconds 
    })
}));

// Save session cart API
app.post("/cart", function(req, res){
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err){
        if(err){
            throw err;
        }

        res.json(req.session.cart);
    });    
});

// Get session cart API
app.get("/cart", function(req, res){
    if (typeof req.session.cart !== "undefined"){
        res.json(req.session.cart);
    }
});

// End Set Up Sessions

var Book = require("./src/server/models/book");

// GET Book
app.get("/book", function(req, res) {
    Book.find(function(err, books){
        if(err){
            throw err;
        }

        res.json(books);
    });
});

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

// Update Book
app.put("/book/:_id", function(req, res) {
    var book = req.body;
    var query = req.params._id;

    // if the field doesn't exist, $set will add a new field
    var update = {
        "$set": {
            "title": book.title,
            "description": book.description,
            "image": book.image,
            "price": book.price
        }
    };

    // when true, returns updated document
    var options = {new: true};

    Book.findOneAndUpdate(query, update, options, function(err, books) {
        if(err) {
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


app.listen(3001, function(err){
    if(err) {
        return console.log(err);
    }
    console.log("API Server is listening on http://localhost:3001");
});
