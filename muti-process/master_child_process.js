const child_process = require('child_process');

for(var i = 1; i <= 3; i++){
    var workerProcess = child_process.exec('node support.js '+i,function(error,stdout,stderr){
        if(error){
            console.log(`error:code->${error.code}`);
        }
        else{
            //stdout调用子进程输出
            console.log(`stdout:${stdout}`);
            console.log(`stderr:${stderr}`);
        }
    });
    (function(i){
        workerProcess.on('exit', function (code, signal) {
            console.log(`Process${i} exited with code ${code};signal:${signal}`);
        });
    })(i);
}