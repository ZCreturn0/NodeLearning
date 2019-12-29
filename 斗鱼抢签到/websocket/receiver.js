const { App } = require('koishi');
const robot = require("robotjs");

const app = new App({
    type: "ws",
    server: "ws://129.204.113.40:6700",
    selfId: 787899278,
    secret: "hanser",
    token: "hanser",
    plugins: [
        ["common"],
    ],
});

app.receiver.on('message', (meta) => {
    console.log(meta.groupId);
    console.log(meta.rawMessage);
    console.log(meta.sender.userId);
    if (meta.sender.userId == '794698991' && ~meta.rawMessage.indexOf('开播')) {
        robot.mouseClick();
        console.log('done');
    }
})

app.start();