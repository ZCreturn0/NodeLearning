/**
 * 注意修改时间间隔!!!!!!!!!
 * 注意修改评论内容!!!!!!!!!
 * 注意修改关键字!!!!!!!!!!!
 * 注意修改成最新cookie!!!!!
 * 适当调整时间戳(暂时不知道什么用)
 */
const request = require('request');

// 获取帖子列表URL
const POST_LIST_URL = 'https://yuba.douyu.com/wbapi/web/group/postlist?group_id=765880&page=1&sort=1';
// 刷新间隔
const INTERVAL = 0.1 * 1000;
// 用户名
const USER = 'hanserLIVE'; // hanserLIVE
// 标题关键字
const KEYWORDS = ['买过', '智商税'];
// 回帖内容
const CONTENT = '憨八嘎回来了 awsl ~~'; //小天使~ 毛怪们 晚上好呀~    [开车]     小天使~ 毛怪们 晚上好呀~[开车][开车]
// 时间戳
const TIMESTAMP = Math.random();
// cookie
const COOKIE = 'dy_did=c786786def77d12e7493668900061501; smidV2=20180715181308687271adbb23af468dfd1599c204d1ec0088c3a3a660769e0; acf_yb_did=c786786def77d12e7493668900061501; _ga=GA1.2.365818811.1542716072; wan_auth37wan=21fccbee92eaKAowMufbxA2zTvh5fBo1Dw9ARScPnenya0uomcYxC4X2MkexEzsALLGHozpsJMCasnlbAixyX6uQPTHjW1eS8NJ0%2FsjtmavyIVi1K6U; acf_yb_t=jyMPtvBjVOo9O6XTXTz9jOb7qZ2xGZmH; acf_yb_auth=df40ee9408614733c29beaa629b90012590cce46; acf_yb_new_uid=JGdyepZy9QdX; acf_yb_uid=245644962; _dys_refer_action_code=click_yubatopic_yuba; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1575201146,1575208279,1575283976,1575290400; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1575290406; Hm_lvt_e0374aeb9ac41bee98043654e36ad504=1575288051,1575288500,1575289895,1575290415; _dys_lastPageCode=page_studio_normal,; Hm_lpvt_e0374aeb9ac41bee98043654e36ad504=1575290465';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';
// 定时器
let timer = null;
// 是否已经回帖
let replied = false;

// 标题含有全部关键字
function haveAllKeywords(title){
    for (let keyword of KEYWORDS) {
        if (!~title.indexOf(keyword)) {
            return false;
        }
    }
    return true;
}

function go(){
    request(POST_LIST_URL, (err, res, body) => {
        if(err){
            console.log(err);
        }
        else{
            let json = JSON.parse(body);
            // 遍历帖子
            for (let post of json.data) {
                if (post.nickname == USER && haveAllKeywords(post.title)) {
                    clearInterval(timer);
                    if(!replied){
                        replied = true;
                        reply(post.post_id);
                    }
                }
            }
        }
    });
}

// 回帖
function reply(post_id){
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
        if(err){
            console.log(err);
        }
        else{
            console.log(body);
        }
    });
}

go();
timer = setInterval(go, INTERVAL);