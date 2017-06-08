var path = require("path");
var util = require('util')
var express = require('express');
var router = express.Router();
var fs = require("fs");
var querystring = require("querystring");

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');


//custom
var dPath = path.resolve();
var tool = require(dPath+'/public/tool.js');


router.get('/', function (req, res) {
 res.sendFile( dPath + "/views/index.html" );
});
router.get('/index', function (req, res) {
  res.sendFile( dPath + "/views/index.html" );
});
router.get('/index.html', function (req, res) {
  res.sendFile( dPath + "/views/index.html" );
});
router.get('/download', function (req, res) {
  res.sendFile( dPath + "/views/download.html" );
});
router.get('/download.html', function (req, res) {
  res.sendFile( dPath + "/views/download.html" );
});
//router.get('/chat', function(req, res){
//    res.sendFile(dPath + "/views/chat.html");
//});

// 上传
router.post('/file_upload', function (req, res) {

   console.log(req.files[0]);  // 上传的文件信息

   var des_file = dPath + "/data/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
     if( err ){
      console.log( err );
    }else{
     response = {
       message:'File uploaded successfully', 
       filename:req.files[0].originalname
     };
   }
   console.log( response );
   res.end( JSON.stringify( response ) );
 });
  });
 });

// 下载
router.post('/file_download', function (req, res,next) {
  console.log("start download");
  var des_file = dPath + "/data/" + "gtslApp_signed.apk";
  res.download(des_file);
});




// posttest
router.post('/posttest', function (req, res,next) {
  console.log("posttest");
  // 定义了一个post变量，用于暂存请求体的信息
    var postBuffer = '';  
    var postBackBuffer = '';   
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){
      console.log(JSON.parse(chunk));
      // postBuffer += JSON.parse(chunk);
      postBuffer = JSON.parse(chunk);
      //处理收到数据
      _dealWithData(postBuffer);
    });

  // 在end事件触发后，处理数据然后向客户端返回。
    req.on('end', function(){
      //返回数据
      res.json(postBackBuffer)
    });

/**
 * 处理数据
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
    function _dealWithData(data){
      //遍历:
      for(var key in data){
        if(key === "userId"){
          if(data[key] === "MMP"){
            console.log("是MMP没错")
            postBackBuffer = _toObject({},"是MMP没错","login",200);
          }else{
            console.log("不是MMP！")
            postBackBuffer = _toObject({},"不是MMP！","login-false",200);
          }
        }else{
          postBackBuffer = _toObject({},"用户id不能为空","",400);
        }
      }

    }
        
    /**
     * 处理返回数据格式
     * @param  {Object} data    [description]
     * @param  {String} message [description]
     * @param  {String} status  [description]
     * @param  {String} code    [description]
     * @return {[type]}         [description]
     */
    function _toObject (data, message, status, code) {
      
      if(!message){
        message = "message null"
      }
      if(!status)status = "status error";
      if(!code)code = 500;
      var obj = {
        data:data,
        message:message,
        status:status,
        code,code
      };

      return obj;
    }
});


//required
module.exports = router;

