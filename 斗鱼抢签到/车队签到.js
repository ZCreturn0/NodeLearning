const CronJob = require('cron').CronJob;
const request = require('request');

const COOKIE = 'smidV2=2019100911115245d4a9e1bd276ad8cb6f57bd8e5275cf009cc7ab561c547e0; dy_did=64a637aa8d4b267801d704be00091501; dy_auth=d2753cfF6JGQIprMJSMAP4VikU1sOGYwiBJCLCRJ91glWzvYPbGlSuK%2FPhtPRO9D9fLBWXj0lLQVAaAPJ8HK8KhkKYZYRwxLc%2FlLhzwfPig6n1rtnDGiQu8; wan_auth37wan=514a47b5ddfbxnb2iO2YBp%2BU9kDOr3ptLeVfVHYRFxhSwfXN5jN%2Fdx%2Bnl4fqaCAMB9McxgUb9VxojFs5Hx1iojNut5U7xhIYI%2BQgYmBdd%2BshHj7%2Fu%2FM; dy_did=64a637aa8d4b267801d704be00091501; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1577151137,1577237692,1577322093,1577411518; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1577411518; acf_yb_t=yoQw8ULgnsjHcErPbegPyhzZlbDX0DrQ; msg_auth=108dac2c5ec810bfe87dab789b6099a96c98eddc; msg_uid=JGdyepZy9QdX; Hm_lvt_e0374aeb9ac41bee98043654e36ad504=1577251984,1577431281; msgUnread=0; Hm_lpvt_e0374aeb9ac41bee98043654e36ad504=1577431512; post-csrfToken=azpvdnmnqyu';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';
// 车队 id
const GROUP_ID = '@TGS#4HULUXAGB';

new CronJob('00 00 00 * * *', _ => {
    signIn();
}, null, true);

let cookieMap = get_cookies(COOKIE);
// console.log(cookieMap['post-csrfToken']);

// request({
//     url: `https://msg.douyu.com/v3/motorcade/signs/weekly?mid=${GROUP_ID}&timestamp=${Math.random()}`,
//     method: 'get',
//     headers: {
//         'user-agent': USER_AGENT,
//         cookie: COOKIE,
//         referer: 'https://msg.douyu.com/motorcade/',
//         'dy-client': 'web',
//         'dy-csrf-token': cookieMap['post-csrfToken'],
//         'sec-fetch-mode': 'cors',
//         'sec-fetch-site': 'same-origin',
//         'accept': 'application/vnd.msg.douyu.com.v2+json',
//         'dy-device-id': '-',
//         'pragma': 'no-cache'
//     }
// }, (err, res, body) => {
//     if (err) {
//         console.log(err);
//     } 
//     else {
//         let json = JSON.parse(body);
//         console.log(json);
//     }
// });

function signIn() {
    request.post({
        url: `https://msg.douyu.com/v3/msign/add?timestamp=${Math.random()}`,
        headers: {
            'user-agent': USER_AGENT,
            cookie: COOKIE,
            referer: 'https://msg.douyu.com/motorcade/',
            'dy-client': 'web',
            'dy-csrf-token': cookieMap['post-csrfToken'],
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'accept': 'application/vnd.msg.douyu.com.v2+json',
            'dy-device-id': '-',
            'pragma': 'no-cache'
        },
        form: {
            to_mid: '@TGS#4HULUXAGB',
            expression: 6
        }
    }, (err, res, body) => {
        if (err) {
            console.log(err);
        } else {
            let json = JSON.parse(body);
            console.log(json);
        }
    });
}

// 拆解 cookie 字符串
function get_cookies(cookieStr) {
    let cookies = {};
    cookieStr.split(';').forEach(function (cookie) {
        let parts = cookie.match(/(.*?)=(.*)$/)
        cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
    return cookies;
}