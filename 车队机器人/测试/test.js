const request = require('request');

const URL = 'https://webim.tim.qq.com/v4/openim/longpolling';

let params = {
    websdkappid: 537048168,
    v: '1.7.0',
    platform: 10,
    tinyid: 144115212301757776,
    a2: '424b169280008a647727acf2b733afb3ffb188f5b1cb0bc090a2f63ea852656a80339661b3578f319e54910d123d60306ca02b7443fec00ab5a9d32da90a4751ba677e9ca7830a4d',
    contenttype: 'json',
    sdkappid: 1400029396,
    accounttype: 9967,
    apn: 1,
    reqtime: 1576245702
};

let headers = {
    Connection: 'keep-alive',
    Host: 'webim.tim.qq.com',
    Origin: 'https://msg.douyu.com',
    Referer: 'https://msg.douyu.com/web/index.html?isfullmode=1&t=1576242513807',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36'
};

let formData = {
    Timeout: 'null',
    Cookie: '{"NotifySeq": 0,"NoticeSeq": 50,"LongPollingId": "1576242513823246695"}'
};

let url = '';
let query = [];
for (let [key, value] of Object.entries(params)) {
    query.push(`${key}=${value}`);
}
url = `${URL}?${query.join('&')}`;

request.post({
    url,
    form: formData,
    headers
}, (err, res, body) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log(body);
    }
});