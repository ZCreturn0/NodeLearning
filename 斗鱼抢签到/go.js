const request = require('request');

// 房间号
const ROOM_ID = '2550505';
// 查询链接
const URL = 'http://open.douyucdn.cn/api/RoomApi/room/';
// 获取 cookie
const COOKIE_URL = 'https://www.douyu.com/curl/csrfApi/getCsrfCookie?';
// 签到 url
const CHECK_IN_URL = 'https://www.douyu.com/japi/roomuserlevel/apinc/checkIn';
// cookie
const COOKIE = 'dy_did=c786786def77d12e7493668900061501; smidV2=20180715181308687271adbb23af468dfd1599c204d1ec0088c3a3a660769e0; _ga=GA1.2.365818811.1542716072; acf_did=c786786def77d12e7493668900061501; loginrefer=pt_68df1a95417l; _dys_refer_action_code=click_collect; PHPSESSID=ci29d06qfqer1ogkf6keiq5cv3; acf_auth=09deZaeoZBYi%2FVMaUqhUWqCyPSVBpxL8jM2vxEcHnO6o%2BvD9I17yw3teHIzXdEFg4%2FWPpAiQalHnCwCrNWQx%2FesrZFQ1UjCp272grsFASX56haE%2BC%2FiiWUQ; wan_auth37wan=4b8b1323c00dONI4S9bXMmBJXr0tuU7neEz9RjMgq03hDPJOCQtToPX8v4ff%2BUGiKGUNp7TCZ6HisgNRxNk21cB%2FwznmqrWCNu6t1OktKmiS2oMAxtY; acf_uid=245644962; acf_username=245644962; acf_nickname=%E7%96%AF%E7%8B%82%E5%90%B8%E6%86%A8; acf_own_room=0; acf_groupid=1; acf_phonestatus=1; acf_avatar=https%3A%2F%2Fapic.douyucdn.cn%2Fupload%2Favatar_v3%2F201909%2F5a899ae011c4482db76e500c2203f42f_; acf_ct=0; acf_ltkid=35325400; acf_biz=1; acf_stk=afdec91a8e562f27; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1570533010,1570539364,1570544921,1570618811; acf_ccn=0b858c9256b48458cb01d73797b55522; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1570621055';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';
// 开播啦
const STATUS_ONLINE = '1';
// 没开播
const STATUS_OFFLINE = '2';
// 轮巡间隔
const INTERVAL = 0.1 * 1000;

// 定时器
let timer = null;

// 查询开播状态
function checkOnline(){
    request(`${URL}${ROOM_ID}`, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        else {
            let json = JSON.parse(body);
            if (json.data.room_status == STATUS_ONLINE) {
                clearInterval(timer);
                sign();
            }
            else if (json.data.room_status == STATUS_OFFLINE) {
                console.log('还没开播呢~');
            }
        }
    });
}

// 签到
function sign(){
    // 获取 cookie 以获得 签到需要的 ctn 参数
    request({
        url: COOKIE_URL,
        headers: {
            'user-agent': USER_AGENT,
            cookie: COOKIE,
            origin: 'https://yuba.douyu.com'
        }
    }, (err, res, body) => {
        if (err) {
            console.log(err);
        } 
        else {
            let cookieMap = get_cookies(res.headers['set-cookie'][0]);
            let ctn = cookieMap['acf_ccn'];
            request.post({
                url: `https://dotcounter.douyucdn.cn/deliver/fish2`,
                form: {
                    multi: [{
                        "d": "c786786def77d12e7493668900061501",
                        "i": "245644962",
                        "rid": ROOM_ID,
                        "u": `/${ROOM_ID}`,
                        "ru": "/directory/myFollow",
                        "ac": "click_giftbar_activity",
                        "rpc": "page_follow",
                        "pc": "page_studio_normal",
                        "pt": 1570621985117,
                        "oct": 1570622019327,
                        "dur": 0,
                        "pro": "host_site",
                        "ct": "web",
                        "e": {
                            "active_id": "223",
                            "is_fold": 0,
                            "rac": "click_title_follow",
                            "fps": -1,
                            "ver": "09f66fa097a34aa55be888f1a308f754b8c9eadc",
                            "dv": 2
                        },
                        "av": "",
                        "up": ""
                    }],
                    v: 1.5
                },
                headers: {
                    'user-agent': USER_AGENT,
                    origin: 'https://yuba.douyu.com'
                }
            }, (err, res, body) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(body);
                }
            });
            request.post({
                url: CHECK_IN_URL,
                form: {
                    rid: ROOM_ID,
                    ctn
                },
                headers: {
                    'user-agent': USER_AGENT,
                    cookie: COOKIE,
                    origin: 'https://yuba.douyu.com',
                    referer: `https://www.douyu.com/${ROOM_ID}`
                }
            }, (err, res, body) => {
                if (err) {
                    console.log(err);
                } else {
                    let json = JSON.parse(body);
                    console.log(json);
                    if (!json.error) {
                        console.log('签到成功');
                    }
                    else{
                        console.log(json.msg);
                    }
                }
            });
        }
    });
}

// 拆解 cookie 字符串
function get_cookies(cookieStr){
    let cookies = {};
    cookieStr.split(';').forEach(function (cookie) {
        let parts = cookie.match(/(.*?)=(.*)$/)
        cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
    return cookies;
}

checkOnline();
timer = setInterval(checkOnline, INTERVAL);