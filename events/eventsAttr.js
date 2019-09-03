const events = require('events');
var eventEmitter = new events.EventEmitter();

function listener1(){
    console.log('listerer1');
}
function listener2(){
    console.log('listerer2');
}

// listener 可通过 removeListener 移除
eventEmitter.addListener('connection', listener1);
eventEmitter.on('connection', listener2);
var count = eventEmitter.listenerCount('connection');
console.log('count:'+count);

eventEmitter.emit('connection');
eventEmitter.removeListener('connection', listener1);
console.log('listener1 removed');
var count = eventEmitter.listenerCount('connection');
console.log('count:' + count);
eventEmitter.emit('connection');

console.log('finished');
