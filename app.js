/*hhb 2016/9/16*/

var express = require('express');
var app = express();
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');

// var route = require('./routes/router');
var server = require('./servers/server');
var fs = require('fs');



// tool.setVersionArray();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.use('/',server);
app.use('/file_upload',server);
app.use('/download',server);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




var service = app.listen(8081, function () {

  var host = service.address().address
  var port = service.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})