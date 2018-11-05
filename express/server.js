const express = require('express');
const app = express();
const path = require('path');

//http://127.0.0.1:8888/1647410dafb0b615.webp.jpg 访问图片
app.use(express.static('images'));

app.get('/',function(req,res){
    res.send('path:/   method:get');
})
app.post('/', function (req, res) {
    res.send('path:/   method:post');
})

app.get('/aaa', function (req, res) {
    res.send('path:/aaa   method:get');
})
app.post('/aaa', function (req, res) {
    res.send('path:/aaa   method:post');
})

app.get('/bbb', function (req, res) {
    res.send('path:/bbb   method:get');
})
app.post('/bbb', function (req, res) {
    res.send('path:/bbb   method:post');
})

app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname,'./index.html'));
})
app.get('/process_get',function(req,res){
    var json = {};
    json.name = req.query.name;
    json.addr = req.query.addr;
    res.send(json);
})

app.get('/*', function (req, res) {
    res.send('path:/*   method:get');
})
app.post('/*', function (req, res) {
    res.send('path:/*   method:post');
})

var server = app.listen('8888',function(){
    var ip = server.address().address;
    var port = server.address().port;
    console.log(ip+':'+port);
})