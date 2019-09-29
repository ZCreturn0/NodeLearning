const Server = require('ws').Server;
const Uuid = require('node-uuid');
const IP = '192.168.75.120';
const PORT = 8888;
const ws = new Server({
    port: PORT
});

console.log(`websocket running in ws://${IP}:${PORT}`);

// 存储所有的连接
let sockets = [];

ws.on('connection', (socket) => {
    // 保存 socket 和 uuid(唯一标识)
    let id = Uuid.v1();
    sockets.push({
        id: id,
        socket: socket
    });
    console.log("aaa---size:" + ws.clients.size);
    socket.on('message', (message) => {
        let msg = JSON.parse(message);
        console.log(msg);
        switch(msg.type){
            case 0:
                msg.id = id;
                sockets.forEach(item => {
                    socketSendObject(item.socket, msg);
                });
                break;
            case 1:
                sockets.forEach((item, index) => {
                    if (item.id === msg.id) {
                        item.socket.close();
                        sockets.splice(index, 1);
                    }
                });
        }
        // console.log(ws.);
        console.log(`bbb---当前有 ${sockets.length} 个用户在线`);
        // 退出条件
        // if (msg.text === 'say goodbye to hanser' || msg.text === 'hanser says goodbye') {
        //     console.log('goodbye hanser');
        //     socket.close();
        //     ws.close();
        // }
    });
    socket.on('close', () => {
        console.log('ccc---已关闭');
        console.log("ddd---size:" + ws.clients.size);
    })
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