var path = require("path");
var express = require('express');
var router = express.Router();
var fs = require("fs");

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');


//custom
var dPath = path.resolve();
var tool = require(dPath+'/public/tool.js');


router.get('/', function (req, res) {
   res.sendFile( dPath + "/views/index.html" );
})

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
})

// 下载
router.post('/download', function (req, res,next) {
  console.log("start download");
   var des_file = dPath + "/data/" + "gtslApp.apk";
   res.download(des_file);
})


//required
module.exports = router;

