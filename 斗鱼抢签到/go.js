const request = require('request');

// 房间号
const ROOM_ID = '2550505';
// 查询链接
const URL = 'http://open.douyucdn.cn/api/RoomApi/room/';
// 开播啦
const STATUS_ONLINE = '1';
// 没开播
const STATUS_OFFLINE = '2';
// 轮巡间隔
const INTERVAL = 10 * 1000;

// 定时器
let timer = null;

// 查询开播状态
function checkOnline(){
    request(`${URL}${ROOM_ID}`, (err, res, body) => {
        if (err) {
            console.log(err);
        } 
        else {
            let json = JSON.parse(body);
            if (json.data.room_status == STATUS_ONLINE) {
                clearInterval(timer);
                sign();
            }
            else if (json.data.room_status == STATUS_OFFLINE) {
                console.log('还没开播呢~');
            }
        }
    });
}

// 签到
function sign(){
    console.log('签到');
}

checkOnline();
timer = setInterval(checkOnline, INTERVAL);