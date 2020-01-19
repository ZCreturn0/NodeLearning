const request = require('request');

request.post({
    url: `https://yuba.douyu.com/ybapi/answer/comment?timestamp=${Math.random()}`,
    form: {
        repost: false,
        content: `<p<img src='https://img.douyucdn.cn/data/yuba/weibo/2020/01/12/202001122052059442679024889.gif?i=257ffa672c71b0ce0facc7236a1d035572'/></p>`,
        pid: '247476851578830827',
        vo_id: '',
        tokensign: ''
    },
    headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
        cookie: 'dy_did=c786786def77d12e7493668900061501; smidV2=20180715181308687271adbb23af468dfd1599c204d1ec0088c3a3a660769e0; acf_yb_did=c786786def77d12e7493668900061501; _ga=GA1.2.365818811.1542716072; acf_yb_auth=55bad6259cbe1ba0470f5612fdc512f0ce666c0f; acf_yb_new_uid=JGdyepZy9QdX; acf_yb_uid=245644962; dy_auth=b3cfLP%2FM76c1At6AvDFvqVzSRRIIiMJ3S7A2B0OcPb0oeTI2IQgt4LbKSGKMiN64%2BoCaFr0mjNSiyUOifaXrfz8UT9Lj6e2eQBEqkxP5I%2BLylTemhjOlEf8; wan_auth37wan=fea8ecf3597dhrmQ8tpLB4WYgeqyhdW7jUal6p7u5vo2vu7nq%2BK8pWv5Sbce4wD2D8PoTuT6hcQQDTRU7E7aWpZRW10Dyig%2FG6VhshInOsExrE0yhDo; acf_yb_t=2Wlgn5SOYst7Y2ixp2YRWNCxZufIxU9F; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1578742393,1578752672,1578762496,1578831972; _dys_lastPageCode=page_studio_normal,; _dys_refer_action_code=click_yubatopic_yuba; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1578834116; Hm_lvt_e0374aeb9ac41bee98043654e36ad504=1578833220,1578833665,1578834310,1578835054; Hm_lpvt_e0374aeb9ac41bee98043654e36ad504=1578835287',
        origin: 'https://yuba.douyu.com',
        referer: `https://yuba.douyu.com/p/247476851578830827`
    }
}, (err, res, body) => {
    if (err) {
        console.log(err);
    } else {
        console.log(111);
        console.log(body);
        process.exit(0);
    }
});