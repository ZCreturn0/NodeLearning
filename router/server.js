const http = require('http');
const url = require('url');

function start(route){
    function onRequest(req,res){
        console.log('url:' + req.url);
        var pathName = url.parse(req.url).pathname;
        route(pathName);
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.write('Hello World!');
        res.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log('Server running in 127.0.0.1:8888');
}
module.exports = start;