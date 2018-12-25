var express = require('express');
var path = require('path');
var app = express();
app.use('/static', express.static('static'));//静态文件托管
app.set('views', path.join(__dirname, '/templates'));
app.engine('.html', require('express-art-template'));
// app.engine('art', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

app.get('/', function (req, res) {
    res.render('index.html', {
    // res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        },
        title: '首页',
        name: 'zengwei',
        age: 28,
        hasList: true,
        list: [
            {name: '大熊', age: 30, list: ['a', 'b']} ,
            {name: '静香', age: 30, list: ['c', 'd']} ,
            {name: '胖虎', age: 30, list: ['e', 'f']} ,
        ]
    });
});

// ************************************
// This is the real meat of the example
// ************************************
(function() {

    // Step 1: Create & configure a webpack compiler
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
    var compiler = webpack(webpackConfig);

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
        logLevel: 'warn', publicPath: webpackConfig.output.publicPath
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
})();

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://localhost:' + port);
});