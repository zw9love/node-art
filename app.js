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
        title: '首页11',
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

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://localhost:' + port);
});