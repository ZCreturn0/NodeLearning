const fs = require('fs');

fs.writeFile('note.txt','asdddsaasdasdas',function(err){
    if(err){
        console.error(err);
    }
    else{
        console.log('write done');
        fs.readFile('note.txt',function(err,data){
            if(err){
                console.error(err);
            }
            else{
                console.log(data.toString());
            }
        });
    }
});