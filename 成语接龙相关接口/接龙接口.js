const request = require('request');

// 结尾文字
let word = '是';

request({
    url: `https://chengyujielong.51240.com/${word}__chengyujielong/`,
    method: 'GET'
}, async (err, response, body) => {
    console.log(body);
});