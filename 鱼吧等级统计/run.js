const request = require('request');
const mysql = require('mysql');

const config = require('./db.json');

const connection = mysql.createConnection(config);
connection.connect();

const COMMENTS_URL = 'https://yuba.douyu.com/wbapi/web/post/comments';
const GROUP_ID = 765880;

const START = 0;
const END = 10;

function go () {
    let sql = `SELECT * from post LIMIT ${START},${END}`;
    connection.query(sql, (err, result) => {
        for (let post of result) {
            getUser(post.post_id, 1);
        }
    });
}

go();

// 获取帖子下所有用户等级信息
function getUser(post_id, page) {
    request({
        url: `${COMMENTS_URL}/${post_id}`,
        method: 'GET',
        qs: {
            group_id: GROUP_ID,
            page,
            timestamp: Math.random()
        }
    }, async (err, response, body) => {
        let json = JSON.parse(body);
        for (let commet of json.data) {
            await insertUser(commet.nick_name, commet.safe_uid, commet.group_level, commet.group_title);
        }
        if (page < json.page_total) {
            getUser(post_id, page + 1);
        }
    });
}

// 把用户信息存入数据库
async function insertUser(user, user_safe_id, user_level, user_level_name) {
    let sql = "INSERT INTO user(user, user_safe_id, user_level, user_level_name) VALUES(?,?,?,?)";
    let sqlParams = [user, user_safe_id, user_level, user_level_name];
    await connection.query(sql, sqlParams, (err, res) => {
        if (err) {
            return;
        }
        else {
            console.log(user, 'inserted');
        }
    });
}