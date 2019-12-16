const fs = require('fs');
const http = require('http');
const url = require('url');
require('shelljs/global');

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    console.log(pathname);
    if (pathname == '/page/index.html' || pathname == '/page/index.js') {
        let filename = pathname.substr(1);
        fs.readFile(filename, function (err, data) {
            let suffixName = filename.substr(filename.lastIndexOf("."));
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
            } else {
                if (suffixName == '.html') {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                } else if (suffixName == '.css') {
                    res.writeHead(200, {
                        'Content-Type': 'text/css'
                    });
                } else if (suffixName == '.js') {
                    res.writeHead(200, {
                        'Content-Type': 'application/x-javascript'
                    });
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                }
                res.write(data.toString());
                res.end();
            }
        });
    }
    else if (pathname == '/setKeyWords') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            let params = JSON.parse(data);
            let keywords = params.keywords.join(' ');
            exec(`node run.js ${keywords}`, (status) => {
                console.log(status);
            });
        });
        res.end();
    }
}).listen(8888);