const request = require('request');

// 获取帖子列表URL
const POST_LIST_URL = 'https://yuba.douyu.com/wbapi/web/group/postlist?group_id=765880&page=1&sort=1';
// 刷新间隔
const INTERVAL = 10 * 1000;
// 用户名
const USER = 'hanserLIVE';
// 标题关键字
const keywords = ['展示环节', '网上', '现象'];

function go(){
    request(POST_LIST_URL, (err, res, body) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    });
}

go();
setInterval(go, INTERVAL);