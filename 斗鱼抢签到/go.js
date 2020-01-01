const request = require('request');

// 房间号
const ROOM_ID = '101';
// 获取 cookie
const COOKIE_URL = 'https://www.douyu.com/curl/csrfApi/getCsrfCookie?';
// 签到 url
const CHECK_IN_URL = 'https://www.douyu.com/japi/roomuserlevel/apinc/checkIn';
// cookie
const COOKIE = 'smidV2=2019100911115245d4a9e1bd276ad8cb6f57bd8e5275cf009cc7ab561c547e0; dy_did=64a637aa8d4b267801d704be00091501; acf_yb_did=64a637aa8d4b267801d704be00091501; acf_yb_auth=f24850300a476ca6bc58c23dd9cb94399561e060; acf_yb_new_uid=JGdyepZy9QdX; acf_yb_uid=245644962; dy_auth=d2753cfF6JGQIprMJSMAP4VikU1sOGYwiBJCLCRJ91glWzvYPbGlSuK%2FPhtPRO9D9fLBWXj0lLQVAaAPJ8HK8KhkKYZYRwxLc%2FlLhzwfPig6n1rtnDGiQu8; wan_auth37wan=514a47b5ddfbxnb2iO2YBp%2BU9kDOr3ptLeVfVHYRFxhSwfXN5jN%2Fdx%2Bnl4fqaCAMB9McxgUb9VxojFs5Hx1iojNut5U7xhIYI%2BQgYmBdd%2BshHj7%2Fu%2FM; acf_yb_t=Vz7ylOpyKrMknVdoxBcbRQKtWeUwcpVC; Hm_lvt_e0374aeb9ac41bee98043654e36ad504=1576810915,1577065219,1577151130,1577237639; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1576810923,1577065226,1577151137,1577237692; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1577237692; Hm_lpvt_e0374aeb9ac41bee98043654e36ad504=1577245764';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

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
            console.log(res.headers);
            let cookieMap = get_cookies(res.headers['set-cookie'][0]);
            console.log(cookieMap);
            // let ctn = cookieMap['acf_ccn'];
            // request.post({
            //     url: `https://dotcounter.douyucdn.cn/deliver/fish2`,
            //     form: {
            //         multi: [{
            //             "d": cookieMap['dy_did'],
            //             "i": "245644962",
            //             "rid": ROOM_ID,
            //             "u": `/${ROOM_ID}`,
            //             "ru": "/directory/myFollow",
            //             "ac": "click_giftbar_activity",
            //             "rpc": "page_follow",
            //             "pc": "page_studio_normal",
            //             "pt": 1570621985117,
            //             "oct": 1570622019327,
            //             "dur": 0,
            //             "pro": "host_site",
            //             "ct": "web",
            //             "e": {
            //                 "active_id": "223",
            //                 "is_fold": 0,
            //                 "rac": "click_title_follow",
            //                 "fps": -1,
            //                 "ver": "09f66fa097a34aa55be888f1a308f754b8c9eadc",
            //                 "dv": 2
            //             },
            //             "av": "",
            //             "up": ""
            //         }],
            //         v: 1.5
            //     },
            //     headers: {
            //         'user-agent': USER_AGENT,
            //         origin: 'https://yuba.douyu.com'
            //     }
            // }, (err, res, body) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log(body);
            //     }
            // });
            // request.post({
            //     url: CHECK_IN_URL,
            //     form: {
            //         rid: ROOM_ID,
            //         ctn
            //     },
            //     headers: {
            //         'user-agent': USER_AGENT,
            //         cookie: COOKIE,
            //         origin: 'https://yuba.douyu.com',
            //         referer: `https://www.douyu.com/${ROOM_ID}`
            //     }
            // }, (err, res, body) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         let json = JSON.parse(body);
            //         console.log(json);
            //         if (!json.error) {
            //             console.log('签到成功');
            //         }
            //         else{
            //             console.log(json.msg);
            //         }
            //     }
            // });
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

sign();