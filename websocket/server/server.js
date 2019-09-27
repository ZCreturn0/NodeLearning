const Server = require('ws').Server;
const ws = new Server({
    port: 8888
});

console.log('ws://127.0.0.1:8888');
ws.on('connection', (socket) => {
    console.log('新增一个连接');
    socket.on('message', (message) => {
        socket.send(message);
    });
    // 必须关闭连接,否则强制退出后这个端口会一直被占用
    setInterval(() => {
        socket.close();
        ws.close();
    }, 10 * 1000);
});