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
const INTERVAL = 0.01 * 1000;
// 用户名
const USER = 'hanserLIVE';
// 标题关键字
const KEYWORDS = ['展示环节', '网上', '现象'];
// 回帖内容
const CONTENT = '小天使~ 毛怪们 晚上好呀~';
// 时间戳
const TIMESTAMP = '0.9126456120812414';
// cookie
const COOKIE = 'dy_did=c786786def77d12e7493668900061501; smidV2=20180715181308687271adbb23af468dfd1599c204d1ec0088c3a3a660769e0; acf_yb_did=c786786def77d12e7493668900061501; _ga=GA1.2.365818811.1542716072; loginrefer=pt_68df1a95417l; wan_auth37wan=ec18db34c7dfA453U6v4KNWSKeas6bEk%2BwsTeepK8Q%2BytSqF%2BFw57BfDSs%2BsPVJDYLZdG4lnPt83Lm49E24MnzaQK9fb1Ye8CSR%2BTPMO7VqBXgj8CEA; acf_yb_auth=a12c19061fcf3b5b2e2549fe28356d8680c523c3; acf_yb_new_uid=JGdyepZy9QdX; acf_yb_uid=245644962; acf_yb_t=jHnnMybPll0CQSMUkRjni6UajwdwSCl0; _dys_refer_action_code=click_yubatopic_yuba; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1570379167,1570444545,1570465135,1570533010; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1570533023; Hm_lvt_e0374aeb9ac41bee98043654e36ad504=1570464467,1570465202,1570465261,1570533501; _dys_lastPageCode=page_studio_normal,; Hm_lpvt_e0374aeb9ac41bee98043654e36ad504=1570533535';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';
// 定时器
let timer = null;

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
            console.log('done');
            console.time('parse');
            let json = JSON.parse(body);
            console.timeEnd('parse');
            // 遍历帖子
            console.time('aaaa');
            for (let post of json.data) {
                if (post.nickname == USER && haveAllKeywords(post.title)) {
                    clearInterval(timer);
                    reply(post.post_id);
                }
            }
            console.timeEnd('aaaa');
        }
    });
}

// 回帖
function reply(post_id){
    // request.post({
    //     url: `https://yuba.douyu.com/ybapi/answer/comment?timestamp=${TIMESTAMP}`,
    //     form: {
    //         repost: false,
    //         content: `<p>${CONTENT}</p>`,
    //         pid: post_id,
    //         vo_id: '',
    //         tokensign: ''
    //     },
    //     headers: {
    //         'user-agent': USER_AGENT,
    //         cookie: COOKIE,
    //         origin: 'https://yuba.douyu.com',
    //         referer: `https://yuba.douyu.com/p/${post_id}`
    //     }
    // }, (err, res, body) => {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(body);
    //     }
    // });
}

go();
timer = setInterval(go, INTERVAL);