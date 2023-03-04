const path              = require ("path");
//const HtmlWebpackPlugin = require ("html-webpack-plugin");

module.exports = {
    entry  : './public/js/main.js',
    output : {
        filename : "app.js",
        path     : path.resolve (__dirname, "dist"),
    },
    /*
    plugins : [ new HtmlWebpackPlugin ({
        template : './index.html'
    }) ],
    */
}