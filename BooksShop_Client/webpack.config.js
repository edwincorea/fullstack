var path = require("path");

const webpack = require("webpack");

module.exports = {
    entry: "./src/client/index",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    },
    watch: true,
    devtool: "cheap-module-source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-1"]
                }
            }
        ]
    }
};