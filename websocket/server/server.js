const Server = require('ws').Server;
const ws = new Server({
    port: 8888
});

console.log('websocket running in ws://127.0.0.1:8888');

ws.on('connection', (socket) => {
    console.log('connection incomming');
    socket.on('message', (message) => {
        socket.send(message);
        console.log(message);
        if (message === 'say goodbye to hanser' || message === 'hanser says goodbye') {
            console.log('goodbye hanser');
            socket.close();
            ws.close();
        }
    });
    // 必须关闭连接,否则强制退出后这个端口会一直被占用
    // setInterval(() => {
    //     console.log('done');
    //     socket.close();
    //     ws.close();
    // }, 10 * 1000);
});

ws.on('close', () => {
    console.log('websocket closed');
    process.exit();
})