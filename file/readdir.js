const fs = require('fs');

fs.readdir('./mkdir',function(err,files){
    if(err){
        console.error(err);
    }
    else{
        files.forEach(function(file){
            console.log(file);
        })
    }
});