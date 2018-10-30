const fs = require('fs');

var writeStream = fs.createWriteStream('output.txt');
var data = '第几关第几关大立科技埃里克';

writeStream.write(data,'utf-8');

writeStream.on('finished',function(){
    console.log('write done!');
});
writeStream.on('error',function(err){
    console.error(err);
});
console.log('finished');