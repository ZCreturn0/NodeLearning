const fs = require('fs');

fs.readFile('text.txt',function(err,data){
    if(err){
        console.error(err);
    }
    else{
        console.log(data.toString());
    }
});
console.log('finished');