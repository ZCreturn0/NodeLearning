const request = require('request');

// 获取帖子列表URL
const POST_LIST_URL = 'https://yuba.douyu.com/wbapi/web/group/postlist?group_id=765880&page=1&sort=1';
// 刷新间隔
const INTERVAL = 10 * 1000;
// 用户名
const USER = 'hanserLIVE';
// 标题关键字
const KEYWORDS = ['展示环节', '网上', '现象'];
// 回帖内容
const CONTENT = '1'; //晚上好啊,小天使!!
// 时间戳
const TIMESTAMP = '0.9126456120812414';
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
            console.log(res);
            // 遍历帖子
            for (let post of res.data) {
                if (post.nickname == USER && haveAllKeywords(post.title)) {
                    clearInterval(timer);
                    reply(post.post_id);
                }
            }
        }
    });
}

// 回帖
function reply(post_id){
    
}

go();
timer = setInterval(go, INTERVAL);