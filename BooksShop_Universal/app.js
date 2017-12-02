require("babel-core/register")({
    "presets":["es2015", "react", "stage-1"]
});

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var httpProxy = require("http-proxy");

// Request handler for Server-Side Rendering (SSR)
var requestHandler = require("./requestHandler.js");

var app = express();

app.use(logger("dev"));

//Proxy for API
var apiProxy = httpProxy.createProxyServer({
    target: "http://localhost:3001"
});
app.use("/api", function(req, res){
    apiProxy.web(req, res);
});
//End Proxy

app.use(favicon(path.join(__dirname, "public", "favicon.png")));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");

app.use(requestHandler);

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