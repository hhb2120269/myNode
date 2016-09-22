/*hhb 2016/9/16*/

var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');




// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');



//self js
var server = require('./servers/server');

//设置跨域访问
var cors = require('cors');

////设置跨域访问
//app.all('*', function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//
//    if (req.method == 'OPTIONS') {
//        res.send(200); // 让options请求快速返回
//    }
//    else {
//        next();
//    }
//});
//设置跨域访问
//cors({credentials: true, origin: true})
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));


//页面的声明应在服务之前声明
app.use('/',server);
app.use('/file_upload',server);
app.use('/download',server);
app.get('/chat', function(req, res){
    res.sendFile(__dirname+'/views/chat.html');
    //res.sendFile(__dirname+'/index.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json( {
            message: err.message,
            error: err
        });
        /*Error: No default engine was specified and no extension was provided.*/
        //res.render('error', {
        //    message: err.message,
        //    error: {}
        //});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json('error', {
        message: err.message,
        error: {}
    });
/*Error: No default engine was specified and no extension was provided.*/
    //res.render('error', {
    //    message: err.message,
    //    error: {}
    //});

});

app.listen(8081, function () {
    console.log('listening on *:'+8081);
});


//socket模块
var http = require('http').Server(app);
var io = require('socket.io')(http);

//收到连接
io.on('connection', function(socket){
    console.log('a user connected');

    //获取信息
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);

        //执行广播
        io.emit('chat message', msg);
    });

    //收到断开
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});

//‘http’  must be ‘require('http').Server(app)’  否则找不到socket.io在html中的引用
http.listen(3000, function () {
    console.log('listening on *:'+3000);
});
