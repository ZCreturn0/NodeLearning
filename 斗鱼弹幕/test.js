const WebSocket = require('ws');

const ws = new WebSocket('wss://danmuproxy.douyu.com:8505/', {
    origin: 'https://www.douyu.com'
});

ws.on('open', () => {
    console.log('connected');
    let initData = {
        type: 'loginreq',
        roomid: '312212',
        username: '245644962',
        uid: '245644962'
    };
    let initBuffer = Buffer.from(JSON.stringify(initData), 'hex');
    ws.send(initBuffer);
    setTimeout(() => {
        let joinData = {
            type: 'joingroup',
            rid: '312212',
            gid: '1'
        };
        let joinBuffer = Buffer.from(JSON.stringify(joinData), 'hex');
        ws.send(joinBuffer);
    }, 1000);
    setTimeout(() => {
        let aliveData = {
            type: 'mrkl'
        };
        let aliveBuffer = Buffer.from(JSON.stringify(aliveData), 'hex');
        ws.send(aliveBuffer);
    }, 2000);
});

ws.on('message', (data) => {
    console.log(data);
});


ws.on('close', () => {
    console.log('disconnected');
});