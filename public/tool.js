var fs = require('fs');
var path = require('path')
var dPath = path.resolve();
var versions = [];
fs.readFile(dPath + "/data/version.json", function(err,data){
		// body
		if(err){
			console.log(err)
		}else{
			
			versions = JSON.parse(data);
			console.log(versions);
		}
	})


exports.getVersionArray = function (){
	return versions;
}

exports.setVersionArray = function (){
console.log(JSON.stringify(versions));
	// fs.writeFile(__dirname + "/data/version.json", JSON.stringify(versions), function (err) {
 //         if( err ){
 //             console.log( err );
 //         }else{
 //         	console.log('set success')
 //          }
 //       });
}