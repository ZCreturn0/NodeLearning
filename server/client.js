const http = require('http');

var option = {
    host:'127.0.0.1',
    port:'8888',
    path:'/index.html'
}

function callback(res){
    var data = '';
    res.on('data',function(chuck){
        data += chuck;
    })
    res.on('end',function(){
        console.log(data.toString());
    })
}

var req = http.request(option,callback);
req.end();