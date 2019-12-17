/**
 * @description 自动化抢楼,再也不用输关键字啦,只需更新 cookie 即可
 */

const request = require('request');
const POST_LIST_URL = 'https://yuba.douyu.com/wbapi/web/group/postlist?group_id=765880&page=1&sort=1';
// 获取帖子回复URL(格式为 URL/post_id )
const GET_REPLY_URL = 'https://yuba.douyu.com/wbapi/web/post/comments';
// 要抢的楼
const FLOOR = 6;
// 刷新间隔
const INTERVAL = 0.1 * 1000;
// 时间戳
const TIMESTAMP = Math.random();
// 回帖内容
const CONTENT = '抢麦 怂呐~ 顺便心疼小天使的嗓子'; // 抢麦 怂呐~
const HANSER = 'hanserLIVE'; // hanserLIVE
const ME = '疯狂吸憨';
// 是否已回复
let haveReplied = false;
let index = 0;
// cookie
const COOKIE = 'dy_did=c786786def77d12e7493668900061501; smidV2=20180715181308687271adbb23af468dfd1599c204d1ec0088c3a3a660769e0; acf_yb_did=c786786def77d12e7493668900061501; _ga=GA1.2.365818811.1542716072; acf_yb_t=gsSY2TY1iRSkTqkfImo9rlEDNeorzvvm; acf_yb_auth=b5d9fe57d9f2aa72535b241d62e9ef19bd25c66c; acf_yb_new_uid=JGdyepZy9QdX; acf_yb_uid=245644962; wan_auth37wan=354e541ab9c0iBcqC6qlnrVcs31emXianLGhuHHzPg9dKyITEBJbdxV%2FNiXb28Usx3gwvU8m9fuFnJcpcN0v9C%2F9csdgN2NP9E%2BpRufCzARu1OhQnnQ; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1576330036,1576336241,1576421743,1576496193; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1576497958; Hm_lvt_e0374aeb9ac41bee98043654e36ad504=1576497747,1576497966,1576498319,1576498466; Hm_lpvt_e0374aeb9ac41bee98043654e36ad504=1576498466';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

function go() {
    // 获取帖子列表
    console.log(index++);
    request(POST_LIST_URL, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        else {
            let json = JSON.parse(body);
            // 去除置顶 3 条,取前 5 条
            let data = json.data.slice(3, 8);
            // 遍历帖子
            for (let post of data) {
                if (post.nickname == HANSER && post.comments < 30) {
                    checkReplies(post.post_id, CONTENT);
                }
            }
        }
    });
}

// 查看帖子回复
async function checkReplies(post_id, content) {
    await sleep(INTERVAL);
    request({
        url: `${GET_REPLY_URL}/${post_id}`,
        method: 'GET',
        qs: {
            group_id: 765880,
            page: 1,
            timestamp: Math.random()
        }
    }, async (err, res, body) => {
        let json = JSON.parse(body);
        console.log('总回复:', json.comments_total);
        // 前几楼已经没了
        if (json.comments_total >= FLOOR - 1) {
            if (!haveReplied) {
                haveReplied = true;
                reply(post_id, content);
            }
        } 
        else {
            checkReplies(post_id, content);
        }
    })
}

// 回帖
function reply(post_id, content) {
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
            process.exit(0);
        }
    });
}

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