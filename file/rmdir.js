const fs = require('fs');

fs.rmdir('./aaa',function(err){
    if (err) {
        console.error(err);
    }
    else {
        console.log('dir removed');
    }
});