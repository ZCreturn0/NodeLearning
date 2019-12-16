const request = require('request');
const express = require('express');
const cors = require('cors');

const app = express();

// 允许跨域
app.use(cors({
    origin: ['http://127.0.0.1:25505'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post('/checkIn', function (req, res) {
    for(let key in req) {
        console.log(key);
    }
    console.log(req.params);
    res.send('done');
})

let server = app.listen('25505', function () {
    let ip = server.address().address;
    let port = server.address().port;
    console.log(ip + ':' + port);
});