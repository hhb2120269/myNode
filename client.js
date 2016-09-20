/**
 * Created by 贺弘博 on 2016/9/20.
 */

var io = require('socket.io')(client);
var socket = io.connect('http://10.166.47.157:8081');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});