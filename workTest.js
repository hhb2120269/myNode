var request = require("request"); 
contentDef();
function contentDef(){
	console.log("default taskContent");
	var options = { 
		method: 'POST',
		url: 'http://10.166.41.23/byxx/login.action',
		headers: { 
			'postman-token': '3342370a-7066-3ef8-fd7c-e49a9be8ac94',
			'content-type': 'multipart/form-data; boundary=---011000010111000001101001' ,
			// 'content-type': 'multipart/form-data;',
			// 'cache-control': 'no-cache'
		},
		formData: { 
			upName: '贺弘博',
			upPassword: '1',
			macAddress: '50:7B:9D:5C:52:2B' 
		},
		followRedirect:true,
		followAllRedirects:true,
		followOriginalHttpMethod:true
		// followRedirect:true,
	};

	request(options, function (error, response, body) {

		// console.log("safdasdfasdf");
		if (!error && response.statusCode == 200) {
			console.log(response);
    		console.log(body); // Print the google web page.
  		}else{
  			console.log(response);
  			console.log("there is an error:"+error+"\n"
                +"response.statusCode: "+response.statusCode);
  		}
	});
}