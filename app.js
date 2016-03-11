'use strict';

var http = require('http'),
    url = require('url'),
    router = require('./router');

http.createServer(function (req, res) {
    switch (req.url) {
        case '/':
            router.home(req, res);
            break;

        default:
            router.user(req,  res);
    }
}).listen(3000, 'localhost');

console.log('Server started and listening on port 3000');