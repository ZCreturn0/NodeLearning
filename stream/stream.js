const fs = require('fs');

var readStream = fs.createReadStream('text.txt');
readStream.setEncoding('utf8');

var data = '';
readStream.on('data',function(chuck){
    data += chuck;
});
readStream.on('end',function(){
    console.log(data.toString('utf-8'));
});
readStream.on('error',function(err){
    console.error(err);
});

console.log('finished');