const fs = require('fs');

fs.stat('text.txt',function(err,stats){
    if(err){
        console.error(err);
    }
    else{
        console.log(stats);
        console.log('isFile:' + stats.isFile());
        console.log('isDirectory:' + stats.isDirectory());
    }
});