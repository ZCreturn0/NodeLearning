const child_precess = require('child_process');

for(var i=1;i<=3;i++){
    var workerProcess = child_precess.spawn('node',['support.js',i]);
    workerProcess.stdout.on('data',function(data){
        console.log('stdout:'+data);
    })
    workerProcess.stderr.on('data',function(data){
        console.log('stderr:' + data);
    })
    workerProcess.on('close',function(code,signal){
        console.log('Precess exited with code '+code+';signal:'+signal);
    })
}