const request = require('request');
const mysql = require('mysql');

const config = require('./db.json');

const connection = mysql.createConnection(config);
connection.connect();

const LEVEL_MAP = {
    1: '开门上车',
    2: '刹车失灵',
    3: '边缘试探',
    4: '深海少女',
    5: '猫耳开关',
    6: '过膝长袜',
    7: '快乐崇拜',
    8: '猛男日记',
    9: '女装大佬',
    10: '吴京打采',
    11: '打气筒',
    12: '奶粉厂',
    13: '婴儿车',
    14: '小老公',
    15: '慈善赌王',
    16: '断交鬼才',
    17: '本体烤箱',
    18: '天下太平'
};

// 起始页
const START = 1080;
// 结束页
const END = 1104;
// 总页数
const TOTAL_PAGE = 1104;
// 查询帖子列表
const POSTS_URL = 'https://yuba.douyu.com/wbapi/web/group/postlist';
const GROUP_ID = 765880;

function go() {
    for (let i = START; i <= END; i++) {
        setTimeout(() => {
            getPagePost(i);
        }, 100);
    }
}

go();

// 获取对应页码的帖子信息
async function getPagePost(page) {
    request({
        url: `${POSTS_URL}`,
        method: 'GET',
        qs: {
            group_id: GROUP_ID,
            page,
            sort: 2
        }
    }, async (err, response, body) => {
        let json = JSON.parse(body);
        for (let post of json.data) {
            await insertPost(post.post_id, post.title, post.nickname, post.safe_uid);
            await insertUser(post.nickname, post.safe_uid, post.post_user_level, LEVEL_MAP[post.post_user_level]);
        }
    });
}

// 把帖子信息存入数据库
async function insertPost(post_id, post_title, post_user, post_user_safe_id) {
    let sql = "INSERT INTO post(post_id, post_title, post_user, post_user_safe_id) VALUES(?,?,?,?)";
    let sqlParams = [post_id, post_title, post_user, post_user_safe_id];
    await connection.query(sql, sqlParams, (err, res) => {
        if (err) {
            return;
        }
        else {
            console.log(post_title, 'inserted');
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