const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/',function(req,res){
    fs.readFile(path.join(__dirname, 'data/user.json'), function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.end(data);
        }
    });
})

app.get('/addUser',function(req,res){
    fs.readFile(path.join(__dirname, 'data/user.json'), function (err, data) {
        var userNew = {
            "id": 10,
            "name": "zzz",
            "age": 12,
            "addr": "ZZZ"
        }
        if (err) {
            console.log(err);
        }
        else {
            var json = JSON.parse(data);
            json.userNew = userNew;
            console.log(json);
            res.end(JSON.stringify(json));
        }
    });
})

//404
app.get('/*',function(req,res){

})

var server = app.listen(8888,function(){
    var ip = server.address().address;
    var port = server.address().port;
    console.log(`server running in ${ip}:${port}`);
})