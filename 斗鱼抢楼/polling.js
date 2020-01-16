/**
 * @description 轮巡回帖,终极氵怪
 */

const request = require('request');
const fs = require('fs');
const mysql = require('mysql');
const config = require('./db.json');
const CONNECTION = mysql.createConnection(config);
// 表名 
const TABLE_NAME = 'new_post202001';
const POST_LIST_URL = 'https://yuba.douyu.com/wbapi/web/group/postlist?group_id=765880&page=1&sort=1';
// 获取帖子回复URL(格式为 URL/post_id )
const GET_REPLY_URL = 'https://yuba.douyu.com/wbapi/web/post/comments';
// 点赞URL
const LIKE = 'https://yuba.douyu.com/ybapi/follow/like';
// 查询是否点赞
const IS_LIKED = 'https://yuba.douyu.com/wbapi/web/post/detail';
// 前几楼回复
const FLOOR = 5;
// 刷新间隔
const INTERVAL = 10 * 1000;
// 存入数据库间隔
const SAVE_INTERVAL = 10 * 1000;
// 每次存入的条数
const CONSUME_SIZE = 5;
// 回帖内容
let CONTENT = '[发呆]';
const ME = '疯狂吸憨';
// 关键字不回复
const BAN_WORDS = ['即删', '自删', '水贴', '水', '氵贴', '氵', '冫', '氺'];
// 复读机
const REPEAT = ['早上好', '中午好', '晚上好', '早安', '午安', '晚安'];
// 强
const GOOD = ['礼物', '系列'];
// 加油
const CHEER_UP = ['考试', '挑战', '复习', '加油'];
// 歌单
// const SONGS = ['歌单', '网易', '总结', '年度', '来了', '跟风', '毛怪', '假粉'];
// 生日
const BIRTHDAY = ['生日', '长大一岁', '老了一岁'];
// 呜呜呜
const WUWUWU = ['呜呜呜', '1551'];
// 谁叫我
const CALL_ME = ['吸憨'];
// 开车
const DRIVER = ['图', '喵', 'Hanser', 'hanser', '好日子', '新人', '憨八嘎', '哈哈', '好棒', '画', '唱', '天使', '毛怪'];
// 新年好
// const NEWYEAR2 = ['新年好', '新年快乐', '新的一年'];
// 回帖数
let totalReplies = 0;
// 点赞数
let myLikes = 0;
// 轮巡达到次数才回帖
const INDEX = 6;
let index = 1;
// 缓存
let cache = [];
// cookie
const COOKIE = 'smidV2=2019100911115245d4a9e1bd276ad8cb6f57bd8e5275cf009cc7ab561c547e0; dy_did=64a637aa8d4b267801d704be00091501; acf_yb_did=64a637aa8d4b267801d704be00091501; acf_yb_auth=bf6d9f7ad9c85882f5efcd0cfe3b12bfcdf38ef2; acf_yb_new_uid=JGdyepZy9QdX; acf_yb_uid=245644962; dy_auth=7d02gednGIqWM%2B2kRv%2B6NA79TCdy2vaNWuIdnMU8gH18UGeeeJquzYo6T26Ay8P6XfyDJ8DZ%2FCYAlr2WqwZ9welPpQHHd8IGjtgsUZ432zUuX9u1Jgk7Wc8; wan_auth37wan=9cad9196dcbbF396blsjdI%2FFkuKP5Ehe2K4NZMKI8W7uwzHKtHR0e3jpNmJZIb0Ws022JNVLd4Mb3rFx6J0S%2BDCrtSVn2xuKoVBvozDGBqHw9g0DSvY; acf_yb_t=61wQSK8knNZzktp29bq7QJlfvwxLw4Cn; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1578877635,1578967169,1578980482,1579051555; Hm_lvt_e0374aeb9ac41bee98043654e36ad504=1578877626,1578962969,1579051327,1579135975; Hm_lpvt_e0374aeb9ac41bee98043654e36ad504=1579135983';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

function go() {
    // 获取帖子列表
    request(POST_LIST_URL, async (err, res, body) => {
        console.log('***********************');
        if (err) {
            console.log(err);
        }
        else {
            let json = JSON.parse(body);
            // 去除置顶 3 条,取前 5 条
            let data = json.data.slice(3, 8);
            console.log('index:', index);
            // 遍历帖子
            for (let post of data) {
                console.log('作者:', post.nickname);
                console.log('标题:', post.title);
                console.log('回复数:', post.comments);
                console.log('-------------------------');
                if (somebodyCalledMe(post.title)) {
                    checkReplies(post.post_id, '[鲨鱼打扰了]', {
                        author: post.nickname,
                        title: post.title
                    });
                }
                else {
                    // 回复
                    // sendReply(post);
                }
                if (!(await isLiked(post.post_id))) {
                    like(post.post_id, {
                        author: post.nickname,
                        title: post.title
                    });
                }
            }
            console.log(`已氵 ${totalReplies} 帖.`);
            console.log(`已点赞 ${myLikes} 帖.`);
        }
        if (index == INDEX) {
            index = 0;
        }
        index++;
    });
}

// 查看帖子回复
function checkReplies(post_id, content, info) {
    request({
        url: `${GET_REPLY_URL}/${post_id}`,
        method: 'GET',
        qs: {
            group_id: 765880,
            page: 1,
            timestamp: Math.random()
        }
    }, (err, res, body) => {
        let json = JSON.parse(body);
        // 前几楼已经没了
        if (json.comments_total > FLOOR - 1) {
            return;
        } else {
            if (replied(json.data)) {
                return;
            } else {
                reply(post_id, content, info);
            }
        }
    })
}

// 回帖
function reply(post_id, content, info) {
    request.post({
        url: `https://yuba.douyu.com/ybapi/answer/comment?timestamp=${Math.random()}`,
        form: {
            repost: false,
            content: `<p>${content}</p>`,
            pid: post_id,
            vo_id: '',
            tokensign: ''
        },
        headers: {
            'user-agent': USER_AGENT,
            cookie: COOKIE,
            origin: 'https://yuba.douyu.com',
            referer: `https://yuba.douyu.com/p/${post_id}`
        }
    }, (err, res, body) => {
        if (err) {
            console.log(err);
        } else {
            console.log(body);
            console.log(`已氵 ${++totalReplies} 帖.`);
            log(post_id, info.title, info.author, 1, content, dateFormat('YYYY-mm-dd HH:MM:SS', new Date()));
        }
    });
}

// 根据内容回复
function sendReply(post) {
    // if (post.nickname == 'hanserLIVE') {
    //     checkReplies(post.post_id, '蹲~ [开车][开车][开车]', {
    //         author: post.nickname,
    //         title: post.title
    //     });
    // }
    // else if (post.nickname == '憨捡回家的痒痒泰迪') {
    //     checkReplies(post.post_id, '你又在冫贴??', {
    //         author: post.nickname,
    //         title: post.title
    //     });
    // }
    if(post.nickname == '我会画本子135208') {
        checkReplies(post.post_id, '冲冲冲~ [开车][开车]', {
            author: post.nickname,
            title: post.title
        });
    }
    else if (banned(post.title)) {
        checkReplies(post.post_id, '一起氺一起氺[开车][开车]', {
            author: post.nickname,
            title: post.title
        });
    }
    else {
        // if (index == INDEX) {
        //     if (repeat(post.title)) {
        //         checkReplies(post.post_id, repeat(post.title), {
        //             author: post.nickname,
        //             title: post.title
        //         });
        //     }
        //     else if (good(post.title)) {
        //         checkReplies(post.post_id, good(post.title), {
        //             author: post.nickname,
        //             title: post.title
        //         });
        //     }
        //     else if (customizedReplies(post.title)) {
        //         checkReplies(post.post_id, customizedReplies(post.title), {
        //             author: post.nickname,
        //             title: post.title
        //         });
        //     }
        //     else {
        //         // checkReplies(post.post_id, CONTENT, {
        //         //     author: post.nickname,
        //         //     title: post.title
        //         // });
        //     }
        // }
    }
}

// 点赞
function like(post_id, info) {
    request.post({
        url: `${LIKE}?timestamp=${Math.random()}`,
        form: {
            pid: post_id,
            type: 1
        },
        headers: {
            'user-agent': USER_AGENT,
            cookie: COOKIE,
            origin: 'https://yuba.douyu.com',
            referer: `https://yuba.douyu.com/p/${post_id}`
        }
    }, (err, res, body) => {
        if (err) {
            console.log(err);
        } else {
            myLikes++;
            console.log(body);
            log(post_id, info.title, info.author, 0, '已点赞', dateFormat('YYYY-mm-dd HH:MM:SS', new Date()));
        }
    });
}

// 是否已经点过赞
function isLiked(post_id) {
    return new Promise((resolve, reject) => {
        request({
            url: `${IS_LIKED}/${post_id}?cid=&timestamp=${Math.random()}`,
            method: 'GET',
            headers: {
                'user-agent': USER_AGENT,
                cookie: COOKIE,
                origin: 'https://yuba.douyu.com',
                referer: `https://yuba.douyu.com/p/${post_id}`
            }
        }, (err, res, body) => {
            let json = JSON.parse(body);
            if (json) {
                resolve(json.data.is_liked);
            }
        })
    });
}

// 被召唤
function somebodyCalledMe(title) {
    return contains(title, CALL_ME);
}

// 水贴不回
function banned(title) {
    for (let item of BAN_WORDS) {
        if (~title.indexOf(item)) {
            return true;
        }
    }
    return false;
}

// 启动复读机
function repeat(title) {
    for (let item of REPEAT) {
        if (~title.indexOf(item)) {
            return `${item} [开车]`;
        }
    }
    return false;
}

// 强
function good(title) {
    if (contains(title, GOOD)) {
        return '[强]';
    }
}

// 定义一系列回复
function customizedReplies(title) {
    if (contains(title, CHEER_UP)) {
        return '加油 [奋斗]';
    }
    // else if (contains(title, SONGS)) {
    //     return '[鲨鱼好样的][鲨鱼好样的][鲨鱼好样的]';
    // }
    else if (contains(title, BIRTHDAY)) {
        return '生日快乐 [鲨鱼娘奈斯]';
    }
    else if (contains(title, WUWUWU)) {
        return '摸摸~ [鲨鱼反向烟]';
    }
    else if (contains(title, DRIVER)) {
        return '[开车][开车][开车]';
    }
}

// 标题包含关键字
function contains(title, arr) {
    for (let word of arr) {
        if (~title.indexOf(word)) {
            return true;
        }
    }
    return false;
}

// 是否已经回过了
function replied(data) {
    for (let item of data) {
        if (item.nick_name == ME) {
            return true;
        }
    }
    return false;
}

// 根据时间生成回复内容
function makeMeeting() {
    let hour = new Date().getHours();
    if (hour >= 9 && hour < 22) {
        CONTENT = '[发呆]';
    } else if (hour >= 22 || hour < 1) {
        CONTENT = '[发呆]';
    } else if (hour >= 1 && hour < 2) {
        CONTENT = '[发呆] 早点睡呀 [开车]';
    } else if (hour >= 2 && hour < 3) {
        CONTENT = '[发呆] 少修仙呀~';
    } else if (hour >= 3 && hour < 6) {
        CONTENT = '[发呆] 哇,疯狂修仙的吗,睡了睡了';
    }
}

// 时间格式化
function dateFormat(fmt, date) {
    let ret;
    let opt = {
        "Y+": date.getFullYear().toString(),
        "m+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "H+": date.getHours().toString(),
        "M+": date.getMinutes().toString(),
        "S+": date.getSeconds().toString()
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

// 打印日志
function log(post_id, post_title, post_user, action, content, time) {
    cache.push({
        post_id, post_title, post_user, action, content, time
    });
    logToFile(post_id, post_title, post_user, action, content, time);
}

// 输出日志到文件
function logToFile(post_id, post_title, post_user, action, content, time) {
    let str = `id: ${post_id}\r\n标题: ${post_title}\r\n用户: ${post_user}\r\n\r\n${content}\r\n\r\n时间: ${time}`;
    str = '--------------------------------------------------------------\r\n' + str + '\r\n--------------------------------------------------------------\r\n\r\n\r\n\r\n';
    let today = dateFormat('YYYY-mm-dd', new Date());
    fs.appendFile(`./log/${today}.txt`, str, 'utf-8', err => {
        if (err) {
            console.log(err);
        } else {
            console.log('done');
        }
    });
}

// 输出日志到数据库
function logToDatabase() {
    let chunk = cache.splice(0, CONSUME_SIZE);
    if (chunk.length) {
        chunk.forEach(post => {
            let sql = `INSERT INTO ${TABLE_NAME}(post_id, post_title, post_user, action, content, time) VALUES(?,?,?,?,?,?)`;
            let sqlParams = [post.post_id, post.post_title, post.post_user, post.action, post.content, post.time];
            CONNECTION.query(sql, sqlParams, (err, res) => {
                if (err) {
                    return;
                }
                else {
                    console.log(post.post_user, 'inserted');
                }
            });
        });
    }
}
// makeMeeting();
// setInterval(makeMeeting, 10 * 60 * 1000);

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

async function start() {
    while (true) {
        go();
        await sleep(INTERVAL);
    }
}

async function saveLog() {
    while (true) {
        logToDatabase();
        await sleep(SAVE_INTERVAL);
    }
}

start();
saveLog();