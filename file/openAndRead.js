const fs = require('fs');
var buf = Buffer.alloc(1024);

fs.open('note.txt','r+',function(err,fd){
    if(err){
        console.error(err);
    }
    else{
        fs.ftruncate(fd,6,function(err){
            fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(`${bytes} bytes read`);
                    console.log(buf.toString());
                }
                fs.close(fd, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log('文件已关闭');
                    }
                })
            });
        });
    }
});