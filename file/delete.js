const fs = require('fs');

fs.unlink('delete.txt',function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('delete done');
    }
});