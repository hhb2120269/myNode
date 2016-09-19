var express = require('express');
var router = express.Router();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

//custom
var tool = require("./public/tool.js");

// tool.setVersionArray();
// tool.getVersionArray();

// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/tmp/'}).array('image'));


router.get('/', function (req, res) {
   res.sendFile( __dirname + "\\" + "index.html" );
   // res.sendFile( __dirname + "/" + "index.htm" );
})

router.post('/file_upload', function (req, res) {

   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/data/" + req.files[0].originalname;
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
  // res.sendFile( __dirname + "\\" + "index.html" );
  console.log("start download");
   var des_file = __dirname + "/data/" + "gtslApp.apk";
   // var des_file = __dirname + "/data/" + "version.rar";
   res.download(des_file);
   // res.end(des_file);
   // fs.readFile( des_file, function (err, data) {
   //      if(err){
   //        console.log(err);
   //        res.end( JSON.stringify(err));
   //      }else{
   //        // res.download(des_file);
   //        console.log(res);
   //        res.write(data);
   //        res.end(des_file);
   //      }
   // });
})

