const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const app = express();

//http://127.0.0.1:8888/1647410dafb0b615.webp.jpg 访问图片
app.use(express.static('images'));
//目录;上传控件的'name';个数,最终存在一个数组里
app.use(multer({ dest: './upload' }).array('file',4));
// app.use(bodyParser.urlencoded({extended:false}));

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
    console.log(req.query);
    json.name = req.query.name;
    json.addr = req.query.addr;
    res.send(json);
})

app.post('/upload_file',function(req,res){
    //输出文件信息
    console.log(req.files[0]);
    //保存文件的绝对路径
    var saveFilename = path.join(__dirname, req.files[0].destination, req.files[0].filename+path.extname(req.files[0].originalname));
    //读取上传的文件
    fs.readFile(req.files[0].path,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            //写入文件,文件名为'saveFilename'
            fs.writeFile(saveFilename,data,function(err){
                if (err) {
                    console.log(err);
                }
                else{
                    //删除临时文件
                    fs.unlink(req.files[0].path,function(err){
                        if(err){
                            console.log(err);
                            throw 'delete file error';
                        }
                    })
                    var result = {
                        status:0,
                        msg:'upload success'
                    }
                    //返回结果
                    res.end(result);
                }
            });
        }
    });


    res.end(saveFilename);
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