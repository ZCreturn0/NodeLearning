/**
 * 注意修改时间间隔!!!!!!!!!
 * 注意修改评论内容!!!!!!!!!
 * 注意修改关键字!!!!!!!!!!!
 * 注意修改成最新cookie!!!!!
 * 随机时间戳(暂时不知道什么用)
 */

 /**
  * @description 抢特定的楼
  */
const request = require('request');

// 要抢的楼层
const FLOOR = 6;

// 获取帖子列表URL
const POST_LIST_URL = 'https://yuba.douyu.com/wbapi/web/group/postlist?group_id=765880&page=1&sort=1';
// 获取帖子回复URL(格式为 URL/post_id )
const GET_REPLY_URL = 'https://yuba.douyu.com/wbapi/web/post/comments';
// 刷新间隔
const INTERVAL = 0.1 * 1000;
// 用户名
const USER = 'hanserLIVE'; // hanserLIVE
// 标题关键字
const KEYWORDS = process.argv.slice(2);
// 回帖内容
const CONTENT = '[开车]'; //小天使~ 毛怪们 晚上好呀~    [开车]     小天使~ 毛怪们 晚上好呀~[开车][开车]
// 时间戳
const TIMESTAMP = Math.random();
// cookie
const COOKIE = 'smidV2=2019100911115245d4a9e1bd276ad8cb6f57bd8e5275cf009cc7ab561c547e0; dy_did=64a637aa8d4b267801d704be00091501; wan_auth37wan=6427ec1941feFUewUtGBkUxjYb7z%2FMT1yl%2Be6winkAh%2B52oXVOHuF9sT2RIr2YVvnqJK2GuAa0fC15VCB%2Bg%2Fx5pdWpDWSqN9QPI2DXAkNQfefSSw82U; acf_yb_did=64a637aa8d4b267801d704be00091501; acf_yb_auth=e93015aa2eb0bc9de8dd265c4e6f171d78c0bc56; acf_yb_new_uid=JGdyepZy9QdX; acf_yb_uid=245644962; Hm_lvt_e0374aeb9ac41bee98043654e36ad504=1576026949,1576112405,1576199575,1576458754; acf_yb_t=ycLNAIu7Oedi4ppr9UihpoQP2J4co9D3; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1576026967,1576112510,1576199586,1576458767; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1576458767; Hm_lpvt_e0374aeb9ac41bee98043654e36ad504=1576464104';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';
// 定时器
let timer = null;
// 是否已经回帖
let replied = false;

// 标题含有全部关键字
function haveAllKeywords(title) {
    for (let keyword of KEYWORDS) {
        if (!~title.indexOf(keyword)) {
            return false;
        }
    }
    return true;
}

function go() {
    request(POST_LIST_URL, (err, res, body) => {
        if (err) {
            console.log(err);
        } 
        else {
            let json = JSON.parse(body);
            // 遍历帖子
            for (let post of json.data) {
                if (post.nickname == USER && haveAllKeywords(post.title)) {
                    clearInterval(timer);
                    timer = setInterval(() => {
                        checkReplies(post.post_id);
                    }, INTERVAL);
                }
            }
        }
    });
}

// 查看帖子回复数
function checkReplies(post_id) {
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
        console.log('回复数: ' + json.comments_total);
        if (json.comments_total >= FLOOR - 1) {
            if (!replied) {
                replied = true;
                clearInterval(timer);
                reply(post_id);
            }
        }
    })
}

// 回帖
function reply(post_id) {
    request.post({
        url: `https://yuba.douyu.com/ybapi/answer/comment?timestamp=${TIMESTAMP}`,
        form: {
            repost: false,
            content: `<p>${CONTENT}</p>`,
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
        process.exit(0);
    });
}

go();
timer = setInterval(go, INTERVAL);