const fs = require('fs');

fs.readFile('text.txt',function(err,data){
    console.log('');
    if(err){
        console.error(err);
    }
    else{
        console.log('异步:');
        console.log(data.toString());
    }
});

console.log('同步:');
var data = fs.readFileSync('text.txt');
console.log(data.toString());

console.log('finished');