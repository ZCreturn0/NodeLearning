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
const CONTENT = '抢麦 怂呐~';
const HANSER = 'hanserLIVE';
const ME = '疯狂吸憨';
// 是否已回复
let haveReplied = false;
// cookie
const COOKIE = 'smidV2=2019100911115245d4a9e1bd276ad8cb6f57bd8e5275cf009cc7ab561c547e0; dy_did=64a637aa8d4b267801d704be00091501; wan_auth37wan=6427ec1941feFUewUtGBkUxjYb7z%2FMT1yl%2Be6winkAh%2B52oXVOHuF9sT2RIr2YVvnqJK2GuAa0fC15VCB%2Bg%2Fx5pdWpDWSqN9QPI2DXAkNQfefSSw82U; acf_yb_did=64a637aa8d4b267801d704be00091501; acf_yb_auth=e93015aa2eb0bc9de8dd265c4e6f171d78c0bc56; acf_yb_new_uid=JGdyepZy9QdX; acf_yb_uid=245644962; Hm_lvt_e0374aeb9ac41bee98043654e36ad504=1576026949,1576112405,1576199575,1576458754; acf_yb_t=ycLNAIu7Oedi4ppr9UihpoQP2J4co9D3; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1576026967,1576112510,1576199586,1576458767; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1576458767; Hm_lpvt_e0374aeb9ac41bee98043654e36ad504=1576464104';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

function go() {
    // 获取帖子列表
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
            if (!haveReplied) {
                haveReplied = true;
                reply(post_id, content);
            }
        } 
        else {
            await sleep(INTERVAL);
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