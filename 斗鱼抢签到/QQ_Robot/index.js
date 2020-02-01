const { App } = require('koishi');
const robot = require("robotjs");

const app = new App({
    type: "ws",
    server: "ws://localhost:6700",
    selfId: 787899278,
    secret: "hanser",
    token: "hanser",
    plugins: [
        ["common"],
    ],
});

app.receiver.on('message', (meta) => {
    // console.log(meta.groupId);
    // console.log(meta.rawMessage);
    // console.log('userId', meta.sender.userId);
    console.log(meta.sender.userId + ':' + meta.rawMessage);
    if (~meta.rawMessage.indexOf('开播') && meta.sender.userId == '794698991') { //794698991
        robot.mouseClick();
    }
})

app.start();