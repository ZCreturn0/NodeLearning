const request = require('request');
const douyu_danmu = require('douyu-danmu');

// 房间号
const ROOM_ID = '101';
// 获取 cookie
const COOKIE_URL = 'https://www.douyu.com/curl/csrfApi/getCsrfCookie?';
// 签到 url
const CHECK_IN_URL = 'https://www.douyu.com/japi/roomuserlevel/apinc/checkIn';
// cookie
const COOKIE = 'dy_did=c786786def77d12e7493668900061501; smidV2=20180715181308687271adbb23af468dfd1599c204d1ec0088c3a3a660769e0; _ga=GA1.2.365818811.1542716072; acf_auth=e7ca%2FoaIDMWbt744t6q4ZX%2BJ6hFBohahZ3HRi3tTeCTQVUv%2FMw6ojlBZuAJqr2bbiauluRitaPRwx%2B%2B5pkNkQ2uyiclDg3XsyAsvu2DRuGDweomxCtR056g; wan_auth37wan=fa8083cedd489BzWqW9m59Yf8%2Feu1iof7CJorM9BcwxHVYPS3rB4yrLD%2Fs3gX4HRp%2BDXxBAIajOQnDpkBg7KstNjChXjK6oTvrVE1EAqVn9tp4wjHN8; acf_uid=245644962; acf_username=245644962; acf_nickname=%E7%96%AF%E7%8B%82%E5%90%B8%E6%86%A8; acf_own_room=0; acf_groupid=1; acf_phonestatus=1; acf_ct=0; acf_ltkid=35325400; acf_biz=1; acf_stk=6b238a38b2846626; acf_did=c786786def77d12e7493668900061501; acf_avatar=//apic.douyucdn.cn/upload/avatar_v3/201909/5a899ae011c4482db76e500c2203f42f_; acf_ccn=1196c6e087607bd8903dd4c7624c6e07; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1572606085,1572608849,1572702708,1572703825; PHPSESSID=v7t2cngg5hrd9331u9os7rtsp6; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1572703853; _dys_lastPageCode=page_studio_normal,; _dys_refer_action_code=click_yubatopic_yuba';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

// 用户名
const USER = '疯狂吸憨'; // 聂总小秘书     // 疯狂吸憨
// 关键字
const CONTENT = '.'; // 全体

const client = new douyu_danmu(ROOM_ID);

client.on('connect', () => {
    console.log(`已连接 ${ROOM_ID} 房间弹幕~`);
});

client.on('message', msg => {
    switch (msg.type) {
        case 'chat':
            console.log(`[${msg.from.name}]:${msg.content}`);
            if (~msg.from.name.indexOf(USER) && ~msg.content.indexOf(CONTENT)) {
                sign();
            }
            break
    }
});

client.on('error', e => {
    console.log(e);
});

client.on('close', () => {
    console.log('close');
    connection.end();
});

client.start();

function sign() {
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
        } else {
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
                        "pt": 1572704223812,
                        "oct": 1572704460519,
                        "dur": 0,
                        "pro": "host_site",
                        "ct": "web",
                        "e": {
                            "rid": ROOM_ID,
                            "active_id": "223",
                            "is_fold": 0,
                            "rac": "click_btop_chead_room",
                            "fps": -1,
                            "dzh_type": 2,
                            "zhtname": "OA655802-PDD1",
                            "ver": "ffc9ea1accd6f1594228fb9feda9c109cd1b51dc",
                            "dv": 2,
                            "zt_id": 5456
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
                    } else {
                        console.log(json.msg);
                    }
                }
            });
        }
    });
}

function get_cookies(cookieStr) {
    let cookies = {};
    cookieStr.split(';').forEach(function (cookie) {
        let parts = cookie.match(/(.*?)=(.*)$/)
        cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
    return cookies;
}