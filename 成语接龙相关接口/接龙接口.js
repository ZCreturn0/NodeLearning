const request = require('request');
const cheerio = require('cheerio');

// 结尾文字
let word = '是';

request({
    url: `https://chengyujielong.51240.com/${encodeURI(word)}__chengyujielong/`,
    method: 'GET'
}, (err, response, body) => {
    let $ = cheerio.load(body);
    // console.log(body);
    $('.list li').each((index, element) => {
        console.log($(element).find('a:first-child').text());
    });
});