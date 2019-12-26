/**
 * @description 轮巡回帖,终极氵怪
 */

const request = require('request');
const fs = require('fs');
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
const INTERVAL = 5 * 1000;
// 时间戳
const TIMESTAMP = Math.random();
// 回帖内容
let CONTENT = '[发呆]';
const ME = '疯狂吸憨';
// 关键字不回复
const BAN_WORDS = ['即删', '自删', '水贴', '氵贴', '氵', '冫']; //, '水'
// 复读机
const REPEAT = ['早上好', '中午好', '晚上好', '早安', '午安', '晚安'];
// 强
const GOOD = ['礼物'];
// 回帖数
let totalReplies = 0;
// 轮巡达到次数才回帖
const INDEX = 6;
let index = 1;
// cookie
const COOKIE = 'smidV2=2019100911115245d4a9e1bd276ad8cb6f57bd8e5275cf009cc7ab561c547e0; dy_did=64a637aa8d4b267801d704be00091501; acf_yb_did=64a637aa8d4b267801d704be00091501; acf_yb_auth=f24850300a476ca6bc58c23dd9cb94399561e060; acf_yb_new_uid=JGdyepZy9QdX; acf_yb_uid=245644962; dy_auth=d2753cfF6JGQIprMJSMAP4VikU1sOGYwiBJCLCRJ91glWzvYPbGlSuK%2FPhtPRO9D9fLBWXj0lLQVAaAPJ8HK8KhkKYZYRwxLc%2FlLhzwfPig6n1rtnDGiQu8; wan_auth37wan=514a47b5ddfbxnb2iO2YBp%2BU9kDOr3ptLeVfVHYRFxhSwfXN5jN%2Fdx%2Bnl4fqaCAMB9McxgUb9VxojFs5Hx1iojNut5U7xhIYI%2BQgYmBdd%2BshHj7%2Fu%2FM; Hm_lvt_e0374aeb9ac41bee98043654e36ad504=1577065219,1577151130,1577237639,1577322086; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1577065226,1577151137,1577237692,1577322093; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1577322093; acf_yb_t=Pwqh8PaPKqB5FbkIeEq66rhXrXhyJ61D; Hm_lpvt_e0374aeb9ac41bee98043654e36ad504=1577328810';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

function go() {
    // 获取帖子列表
    request(POST_LIST_URL, (err, res, body) => {
        console.log('***********************');
        if (err) {
            console.log(err);
        } else {
            let json = JSON.parse(body);
            // 去除置顶 3 条,取前 5 条
            let data = json.data.slice(3, 8);
            console.log('index:', index);
            // 遍历帖子
            for (let post of data) {
                console.log('作者', post.nickname);
                console.log('标题', post.title);
                console.log('回复数:', post.comments);
                console.log('-------------------------');
                if (post.nickname == 'hanserLIVE') {
                    continue;
                    // checkReplies(post.post_id, '天使球~ 捕捉', {
                    //     author: post.nickname,
                    //     title: post.title
                    // });
                }
                else if (post.nickname == '憨捡回家的痒痒泰迪') {
                    checkReplies(post.post_id, '你又在氵贴??', {
                        author: post.nickname,
                        title: post.title
                    });
                }
                else if (post.nickname == '我会画本子135208') {
                    checkReplies(post.post_id, '冲冲冲~ [开车][开车]', {
                        author: post.nickname,
                        title: post.title
                    });
                }
                else if (banned(post.title)) {
                    // continue;
                    checkReplies(post.post_id, '一起氵一起氵[开车][开车]', {
                        author: post.nickname,
                        title: post.title
                    });
                }
                else {
                    if (index == INDEX) {
                        if (repeat(post.title)) {
                            checkReplies(post.post_id, repeat(post.title), {
                                author: post.nickname,
                                title: post.title
                            });
                        }
                        else if (good(post.title)) {
                            checkReplies(post.post_id, good(post.title), {
                                author: post.nickname,
                                title: post.title
                            });
                        }
                        else {
                            checkReplies(post.post_id, CONTENT, {
                                author: post.nickname,
                                title: post.title
                            });
                        }
                    }
                }
                if (!isLiked(post.post_id)) {
                    like(post.post_id);
                }
            }
            console.log(`已氵 ${totalReplies} 帖.`);
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
        url: `https://yuba.douyu.com/ybapi/answer/comment?timestamp=${TIMESTAMP}`,
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
            log(`id: ${post_id}`, `标题: ${info.title}`, `作者: ${info.author}`, `回复: ${content}`, `时间: ${dateFormat('YYYY-mm-dd HH:MM:SS', new Date())}`);
        }
    });
}

// 点赞
function like(post_id, info) {
    request.post({
        url: `${LIKE}?timestamp=${TIMESTAMP}`,
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
            console.log(body);
            console.log(`已氵 ${++totalReplies} 帖.`);
            log(`id: ${post_id}`, `标题: ${info.title}`, `作者: ${info.author}`, `已点赞`, `时间: ${dateFormat('YYYY-mm-dd HH:MM:SS', new Date())}`);
        }
    });
}

// 是否已经点过赞
async function isLiked(post_id) {
    request({
        url: `${IS_LIKED}/${post_id}?cid=&timestamp=${Math.random()}`,
        method: 'GET'
    }, (err, res, body) => {
        let json = JSON.parse(body);
        return json.data.is_liked;
    })
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
    for (let item of GOOD) {
        if (~title.indexOf(item)) {
            return `[强]`;
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
function log(...msg) {
    let str = msg.join('\r\n');
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

start();