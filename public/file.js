var formidable = require('formidable');

var fs = require('fs');

exports.upload = function(req,res,next){
	var message = '';
	var form = new formidable.IncomingForm();

	form.encoding = 'utf-8';
	form.uploadDir = 'public/upload';

	form.keepExtensions = true;
	form.maxFieldsSize = 2*1024*1024;

	form.parse(req,function(err){
		if(err){
			console.log(err)
		}
	});

	console.log(res);
};


exports.download = function(req,res){
	var path = "public/upload/file.text"

	res.download(path);
	// res.download(fileath,filename);
}