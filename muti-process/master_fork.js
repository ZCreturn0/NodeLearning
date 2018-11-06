const child_process = require('child_process');

for(var i=1;i<=3;i++){
    var workProcess = child_process.fork('support.js',[i]);
    workProcess.on('close',function(code,signal){
        console.log('Precess exited with code ' + code + ';signal:' + signal);
    })
}