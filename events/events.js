const events = require('events');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('connect',function(){
    console.log('connect');
    eventEmitter.emit('data-receive');
});

eventEmitter.on('data-receive', function(){
    console.log('data-receive');
});

eventEmitter.emit('connect');

console.log('finished');