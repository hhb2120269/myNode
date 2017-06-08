
var schedule = require("node-schedule");
var obj = {
	test:function(){
		var date = new Date(2014,2,14,15,40,0);
		var j = schedule.scheduleJob(date, function(){console.log("执行任务");});
    	//取消任务
    	j.cancel();
    },
    dayTask:function(taskContent){
    	if(!taskContent){
    		return;
    	}
    	var rule = new schedule.RecurrenceRule();
    	　　rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    	　　rule.hour = 8;
    	　　rule.minute = 25;
    	　　var j = schedule.scheduleJob(rule, function(){
    		　　　console.log("执行任务");
    		taskContent();
    	　　});
    },
    secTask:function(taskContent){
    	/**每x秒**/
    	var x = 9;
    	var rule = new schedule.RecurrenceRule();
    	　　var times = [];
    	　　for(var i=0; i<60; i+=x){
    		　　　　times.push(i);
    	　　}
    	　　rule.second = times;
    	　　var c=0;
    	　　var j = schedule.scheduleJob(rule, function(){
    		　　c+=x;
    		　　console.log(c);
    		if(!taskContent){
    			contentDef();
    		}else{
    			taskContent();
    		}
    		
    		
    	　　});

    }



}

// var http = require('http');  
// var qs = require('querystring');
var request = require("request"); 

function contentDef(){
	console.log("default taskContent");
	var options = { 
		method: 'POST',
		url: 'http://10.166.41.23/byxx/login.action',
		headers: { 
			// 'postman-token': '3342370a-7066-3ef8-fd7c-e49a9be8ac94',
			// 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' 
			'content-type': 'multipart/form-data;',
			'cache-control': 'no-cache'
		},
		formData: { 
			upName: '贺弘博',
			upPassword: '1',
			macAddress: '50:7B:9D:5C:52:2B' 
		} 
	};

	request(options, function (error, response, body) {
		// if (error) throw new Error(error);
		// console.log(body);
		// console.log(body);
		if (!error && response.statusCode == 200) {
    		console.log(body); // Print the google web page.
  		}else{
  			console.log("there is an error:"+error);
  		}
	});
}



module.exports = obj;
