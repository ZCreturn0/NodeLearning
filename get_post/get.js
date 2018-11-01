const http = require('http');
const url = require('url');
const util = require('util');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain;chartset=utf-8;'});
    res.end(util.inspect(url.parse(req.url,true)));
    var query = url.parse(req.url, true).query;
    console.log(query)
    for(var item in query){
        console.log(item+'='+query[item]);
    }
}).listen(8888);