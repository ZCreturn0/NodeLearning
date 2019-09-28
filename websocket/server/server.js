const Server = require('ws').Server;
const IP = '192.168.1.102';
const PORT = 8888;
const ws = new Server({
    port: PORT
});

console.log(`websocket running in ws://${IP}:${PORT}`);

// 存储所有的连接
let sockets = [];

ws.on('connection', (socket) => {
    sockets.push(socket);
    socket.on('message', (message) => {
        let msg = JSON.parse(message);
        switch(msg.type){
            case 0:
                sockets.forEach(item => {
                    socketSendObject(item, msg);
                });
                break;
        }
        console.log(`当前有 ${sockets.length} 个用户在线`);
        // 退出条件
        if (msg.text === 'say goodbye to hanser' || msg.text === 'hanser says goodbye') {
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

// 使用 socket 发送对象
function socketSendObject(socket, obj) {
    socket.send(JSON.stringify(obj));
}