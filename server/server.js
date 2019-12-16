const fs = require('fs');
const http = require('http');
const url = require('url');

http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    if (pathname != '/favicon.ico'){
        var filename = pathname.substr(1);
        fs.readFile(filename,function(err,data){
            console.log(filename);
            var suffixName = filename.substr(filename.lastIndexOf("."));
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
            }
            else{
                if (suffixName == '.html') {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                }
                else if (suffixName == '.css') {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                }
                else if (suffixName == '.js') {
                    res.writeHead(200, { 'Content-Type': 'application/x-javascript' });
                }
                else{
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                }
                res.write(data.toString());
                res.end();
            }
        });
    }
}).listen(8888);