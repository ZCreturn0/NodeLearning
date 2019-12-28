const request = require('request');

// 房间号
const ROOM_ID = '2550505';
// 签到 url
const CHECK_IN_URL = 'https://www.douyu.com/japi/roomuserlevel/apinc/checkIn';
// cookie
const COOKIE = 'dy_did=c786786def77d12e7493668900061501; smidV2=20180715181308687271adbb23af468dfd1599c204d1ec0088c3a3a660769e0; _ga=GA1.2.365818811.1542716072; acf_did=c786786def77d12e7493668900061501; acf_devid=f4048f891f732c67019ddb7fc7ae16fd; acf_auth=55a6XEXy317vHdT%2FhWkPr3Z0hu7jmU0kNr3MwSMr5%2BvJSjgOCejpuTKs3IR3OBRTp8%2FK6ht2mRmhmxHRmZ88U7N2O7GmxA47HhlKW%2BbuX70e3fvqhTMjE84; dy_auth=9ee0rQ28iUaMdae3tPxs%2BmNK4SzVtO5Vm4cf2FDq1D6msTiBfIFtCb%2BnnGp85OszUlyABO%2FrVoNBH6PUwBnmd%2F54ziep0pANt%2BAl%2Brc3uLZZr5v5FbHg3hs; wan_auth37wan=95a72899da7cEYzskhxmKefr39Mc%2BWLaQY85KsoRo2KvfV4gq1do5WSqwmrcJQLZt%2Bocpphxhmd5u5NtutKZkohowTsbyngkRielwB0%2F7A8kCCSOH0M; acf_uid=245644962; acf_username=245644962; acf_nickname=%E7%96%AF%E7%8B%82%E5%90%B8%E6%86%A8; acf_own_room=0; acf_groupid=1; acf_phonestatus=1; acf_ct=0; acf_ltkid=35325400; acf_biz=1; acf_stk=34e6f27813bc2463; acf_avatar=//apic.douyucdn.cn/upload/avatar_v3/201909/5a899ae011c4482db76e500c2203f42f_; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1577116732,1577184865,1577196733,1577271533; PHPSESSID=uvrat1b125dbvrkukevph4vek1; acf_ccn=16f6ddbf345fb4f9bba2e327eef8691a; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1577271976';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

function sign() {
    let cookieMap = get_cookies(COOKIE);
    let ctn = cookieMap['acf_ccn'];
    request.post({
        url: CHECK_IN_URL,
        form: {
            rid: ROOM_ID,
            ctn
        },
        headers: {
            'user-agent': USER_AGENT,
            cookie: COOKIE,
            origin: 'https://www.douyu.com',
            referer: `https://www.douyu.com/${ROOM_ID}`
        }
    }, (err, res, body) => {
        if (err) {
            console.log(err);
        } else {
            let json = JSON.parse(body);
            console.log(json);
            if (!json.error) {
                request.post({
                    url: `https://dotcounter.douyucdn.cn/deliver/fish2`,
                    headers: {
                        'user-agent': USER_AGENT,
                        origin: 'https://www.douyu.com',
                        referer: `https://www.douyu.com/${ROOM_ID}`
                    },
                    form: {
                        multi: [{"d":"c786786def77d12e7493668900061501","i":"245644962","rid":4267938,"u":"/4267938","ru":"/directory/all","ac":"show_anchor_rank_label","rpc":"page_studio_normal","pc":"page_studio_normal","pt":1577274400500,"oct":1577274408637,"dur":0,"pro":"host_site","ct":"web","e":{"rid":4267938,"tid":270,"label_id":3,"rac":"show_giftbar_activity","fps":-1,"ver":"48befd3942b647e1f0c5b588d08d463342a0c3df","dv":2},"av":"","up":""}],
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
                        console.log('签到成功');
                    }
                });
            } else {
                console.log(json.msg);
            }
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

sign();