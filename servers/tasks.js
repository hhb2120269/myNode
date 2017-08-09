
var schedule = require("node-schedule");
var obj = {
  test:function(){
        contentDef(0);
    // var date = new Date();
    // var j = schedule.scheduleJob(date, function(){console.log("执行任务");});
  //    //取消任务
  //    j.cancel();
},
dayTask:function(taskContent){
   var rule = new schedule.RecurrenceRule();
   // 　　rule.dayOfWeek = [1, new schedule.Range(1, 5)];//day of week (0 - 7) (0 or 7 is Sun)
   　　rule.dayOfWeek = [1,2,3,4,5];//day of week (0 - 7) (0 or 7 is Sun)

      //
   　　rule.hour = 8;
   　　rule.minute = 22;


   var j = schedule.scheduleJob(rule, function(){
    console.log("dayTask:");
    console.log(new Date());

    var r1= Math.random();
    var r2 = Math.random();
    var sec = (r1*10+r2)*1000*30;//36000000
    setTimeout(function(){
        console.log("执行任务:");
        if(!taskContent){
            contentDef(parseInt(sec));
                    // delayTest(sec);
                }else{
                    taskContent();
                }
            }, sec);
    　　　
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
         contentDef(0);
     }else{
         taskContent();
     }


 　　});

}



}

// var http = require('http');  
// var qs = require('querystring');
var request = require("request"); 

function contentDef(sec){
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
    };

    request(options, function (error, response, body) {

    // console.log("safdasdfasdf");
    if (!error && response.statusCode == 200) {
            console.log(showStringArray(body)); // Print the google web page.
        }else{
           console.log("there is an error:"+error+"\n"
            +"response.statusCode: "+response.statusCode);
       }
       console.log("延时:"+sec);
       console.log(new Date());
   });
}
function delayTest(sec){
    console.log("延时:"+sec);
    console.log(new Date());
}
function showStringArray(body){
    var tag = body.match(/[\u4e00-\u9fa5]{3,10}/g);
    var arr = [];
    if(tag instanceof Array){
        for (var i = 0; i < tag.length; i++) {
            var flag = tag[i];
            if(typeof flag == "string" && (flag.indexOf("签到")||flag.indexOf("MAC地址"))){
                arr.push(flag);
            }
        };
    }
    return arr;
}
module.exports = obj;
