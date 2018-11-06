const express = require('express');
const mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test_sp'
});
connection.connect();

app.get('/select',function(req,res){
    connection.query('SELECT * FROM stu', function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(results);
            res.end(JSON.stringify(results));
        }
    });
});

app.get('/insert',function(req,res){
    var insertSql = 'INSERT INTO stu(id,name,age,addr) VALUES(?,?,?,?)';
    var sqlValues = [2,'hh',12,'lllllll'];
    connection.query(insertSql,sqlValues,function(err,results,fields){
        if(err){
            console.log(err);
        }
        else{
            res.end(JSON.stringify(results));
        }
    });
});

app.get('/update',function(req,res){
    var updateSql = 'UPDATE stu SET name = ?,age = ? WHERE id = ?';
    var updateValues = ['qqq',21,1];
    connection.query(updateSql,updateValues,function(err,results,fields){
        if(err){
            console.log(err);
        }
        else{
            res.end(JSON.stringify(results));
        }
    });
});

app.get('/delete',function(req,res){
    var deleteSql = 'DELETE FROM stu where id = ?';
    var deleteValues = ['0'];
    connection.query(deleteSql,deleteValues,function(err,results,fields){
        if(err){
            console.log(err);
        }
        else{
            res.end(JSON.stringify(results));
        }
    })
});

app.get('/*',function(req,res){
    res.end('404');
});

var server = app.listen(8888,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('server running in '+host+':'+port);
})

server.on('close',function(){
    connection.end();
});