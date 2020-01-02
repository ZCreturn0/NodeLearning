const express = require('express');
const request = require('request');
const path = require('path');
const cookieParser = require('cookie-parser');

const COMMENTS_URL = 'https://yuba.douyu.com/wbapi/web/post/comments';
const POST_ID = '295053851577879710';

const app = express();

app.use(express.static('./'));
app.use(cookieParser());

app.get('/index.html', function (req, res) {
    console.log('index.html');
    res.sendFile(path.join(__dirname, './index.html'));
})

app.get('/getRandom', function (req, res) {
    request({
        url: `${COMMENTS_URL}/${POST_ID}`,
        method: 'GET',
        qs: {
            group_id: 765880,
            page: 1,
            timestamp: Math.random()
        }
    }, async (err, response, body) => {
        let json = JSON.parse(body);
        let page_total = json.page_total;
        let promises = [];
        let comments = [json];
        for (let i = 2; i <= page_total; i++) {
            promises.push(toPromise(i));
        }
        await Promise.all(promises).then(results => {
            comments = [...comments, ...results];
        });
        // 建立用户名和头像映射
        let avatarMap = {};
        // 用户名(去重)
        let userName = new Set();
        for (let page of comments) {
            for (let commet of page.data){
                userName.add(commet.nick_name);
                avatarMap[commet.nick_name] = {
                    avatar: commet.avatar,
                    floor: commet.floor
                };
            }
        }
        // console.log(avatarMap);
        // console.log(userName.size);
        // Set 转成 数组
        let users = [...userName];
        // 随机结果
        let result = [];
        while (users.length) {
            // 随机取一个范围整数
            let index = rangeRandomInt(0, users.length - 1);
            result.push({
                name: users[index],
                avatar: avatarMap[users[index]].avatar,
                floor: avatarMap[users[index]].floor
            });
            users.splice(index, 1);
        }
        res.json(result);
    });
})

var server = app.listen('2550', function () {
    var ip = server.address().address;
    var port = server.address().port;
    console.log(ip + ':' + port);
})

function toPromise(page) {
    return new Promise(resolve => {
        request({
            url: `${COMMENTS_URL}/${POST_ID}`,
            method: 'GET',
            qs: {
                group_id: 765880,
                page,
                timestamp: Math.random()
            }
        }, (err, res, body) => {
            resolve(JSON.parse(body));
        });
    });
}

// 生成范围内的随机整数
function rangeRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
};