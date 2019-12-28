const WebSocket = require('ws');
const https = require('https');
const selfSigned = require('openssl-self-signed-certificate');

var options = {
    key: selfSigned.key,
    cert: selfSigned.cert
};

console.log(options);

const server = https.createServer(options, ).listen(8089);
//console.log(`HTTPS started on port ${port + 1} (dev only).`);
const wss = new WebSocket.Server({
    server
});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});