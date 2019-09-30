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
    // console.log("aaa---size:" + ws.clients.size);
    socket.on('message', (message) => {
        let msg = JSON.parse(message);
        // console.log(msg);
        // 消息类型: 0-进入聊天室  1-离开聊天室  2-发言
        switch(msg.type){
            case 0:
                msg.id = id;
                // 广播消息
                broadcast(sockets, msg);
            break;
            case 1:
                sockets.forEach((item, index) => {
                    if (item.id === msg.id) {
                        item.socket.close();
                        sockets.splice(index, 1);
                        broadcast(sockets, {
                            type: 1,
                            user: msg.user
                        });
                    }
                });
            break;
            case 2:
                let time = dateFormat('YYYY-mm-dd HH:MM:SS', new Date());
                msg.time = time;
                broadcast(sockets, msg);
            break;
        }
        // console.log(ws.);
        console.log(`当前有 ${sockets.length} 个用户在线`);
        // 退出条件
        // if (msg.text === 'say goodbye to hanser' || msg.text === 'hanser says goodbye') {
        //     console.log('goodbye hanser');
        //     socket.close();
        //     ws.close();
        // }
    });
    socket.on('close', () => {
        console.log('已关闭1条连接');
        // console.log("ddd---size:" + ws.clients.size);
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

// 广播消息
function broadcast(sockets, msg) {
    sockets.forEach(item => {
        socketSendObject(item.socket, msg);
    });
}

// 格式化时间
function dateFormat(fmt, date) {
    let ret;
    let opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}