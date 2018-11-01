const fs = require('fs');

fs.mkdir('./mkdir',function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('mkdir done');
    }
})