/**
 * Created by 贺弘博 on 2016/9/20.
 */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8081);

app.get('/', function (req, res) {
    console.log('get something');
    res.sendFile(__dirname + '/views/socketClient.html');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
