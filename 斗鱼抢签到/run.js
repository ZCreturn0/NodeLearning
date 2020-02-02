/**
 * 更换 cookie 即可
 * cookie 必须包含 acf_ccn 字段
 */

const request = require('request');

// 房间号
const ROOM_ID = '262537';
// 签到 url
const CHECK_IN_URL = 'https://www.douyu.com/japi/roomuserlevel/apinc/checkIn';
// cookie
const COOKIE = 'dy_did=c786786def77d12e7493668900061501; smidV2=20180715181308687271adbb23af468dfd1599c204d1ec0088c3a3a660769e0; _ga=GA1.2.365818811.1542716072; acf_did=c786786def77d12e7493668900061501; acf_devid=f4048f891f732c67019ddb7fc7ae16fd; acf_auth=1568X5v24qOYcwYYoyglEeTjNXd1Y84P0hkfccHwgMckJwJRqNN955CbexBHtxOHUHtqdNSQ%2Fe%2FnQRiemYaLQYVPPAOhtGL5mXiKSp9pRqWbBdCwwh7HkZQ; dy_auth=43ffFdReIWGV1W6u9ObCgwuJ6%2BI%2Fb7SLjIG2%2FF9JyVssNgG50qcR62PO91X8lUq89LTNRPGKNHrmBM72AxeeSPCMirWieQlQ4xaHloQOiTLdqqBUmBUd6og; wan_auth37wan=425ef099ea63IjMauWyiFV895J00i48QU2bcF8NoJFzzNNWAIxx0mb9Tnk2OmQQkKyqmuWPor%2B%2BDSgJbIRmk8bNQF6abFvJGdKxrdJ%2FuajoanmPEvP4; acf_uid=245644962; acf_username=245644962; acf_nickname=%E7%96%AF%E7%8B%82%E5%90%B8%E6%86%A8; acf_own_room=0; acf_groupid=1; acf_phonestatus=1; acf_ct=0; acf_ltkid=35325400; acf_biz=1; acf_stk=4395e45846461c69; acf_avatar=//apic.douyucdn.cn/upload/avatar_v3/202001/669f00bafb80487f9eb62e57cc509de1_; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1580566129,1580620823,1580629602,1580640138; PHPSESSID=nf9856gi2of4mdg9a1em4uar92; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1580644078; acf_ccn=6aeec4e481c4a45be9aeb85ef95437e3';
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
                        multi: [{
                            "d": "c786786def77d12e7493668900061501",
                            "i": "245644962",
                            "rid": 101,
                            "u": "/101",
                            "ru": "/directory/myFollow",
                            "ac": "init_page_studio_normal",
                            "rpc": "page_studio_normal",
                            "pc": "page_studio_normal",
                            "pt": 1580643532264,
                            "oct": 1580643532485,
                            "dur": 0,
                            "pro": "host_site",
                            "ct": "web",
                            "e": {
                                "domr": 1,
                                "ut": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
                                "rm1": 6,
                                "rac": "click_btop_cback_room",
                                "t_stamp": 1580643532000,
                                "br_nv": "chrome/79.0.3945.130",
                                "br_l": "zh-CN",
                                "supp_ck": 1,
                                "sys_vt": "chrome/79.0.3945.130",
                                "scr_rw": 1366,
                                "scr_rh": 768,
                                "br_w": 1300,
                                "br_h": 768,
                                "html_w": 1340,
                                "html_h": 985,
                                "ws_x": 0,
                                "ws_y": 0,
                                "sc_c": "x64",
                                "scr_sw": 1283,
                                "scr_sh": 680,
                                "version": "2.0",
                                "lage": "zh-CN",
                                "lages": "zh-CN,zh,en,zh-TW,ja",
                                "tzone": -480,
                                "isse": 1,
                                "iude": 1,
                                "ca": "x64",
                                "fps": -1,
                                "ver": "3097c14842d057b71a75dabaed59cf3a5bdba13b",
                                "dv": 2,
                                "_fp": {
                                    "wedr": "na",
                                    "deme": 8,
                                    "pira": 1,
                                    "hwcu": 4,
                                    "cpuc": "na",
                                    "dott": "na",
                                    "cava": [1, "4a32e09a"],
                                    "wegl": "e325bda3",
                                    "wgvr": "Google Inc.~Google SwiftShader",
                                    "hlla": 0,
                                    "hlrs": 0,
                                    "hlos": 0,
                                    "hlbr": 0,
                                    "audi": "124.04344884395687"
                                }
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