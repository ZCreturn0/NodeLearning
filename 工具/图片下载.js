/*jshint esversion: 6 */
const fs = require('fs');
const path = require('path');
const request = require("request");
const url = require('url');

var filenameList = [
    'H3C',
    '华为',
    '思科',
    '惠普',
    '锐捷',
    '中兴',
    '神州数码',
    '深信服',
    'TP-LINK',
    'NETGEAR',
    'Juniper',
    'D-Link',
    'UBNT',
    '戴尔',
    '天融信',
    '绿盟科技',
    '安恒',
    'ACK',
    '山石网科',
    'Array 华耀科技',
    'ALTEON',
    '东软',
    '联想',
    'IBM',
    '浪潮',
    '杰和',
    '中科曙光',
    '正睿',
    '超微',
    '清华同方',
    '正昱',
    '云海麒麟',
    '华硕',
    '英睿特',
    '金品',
    '宏碁',
    'Wiseteam',
    '宝德',
    '亿时空',
    '富士通',
    'OUO',
    'EMC',
    '同有',
    '宏杉科技',
    '日立',
    '其他',
    '依图',
    'IP-COM',
    'LINKSYS',
    'TG-NET',
    'zyxel',
    '艾泰',
    '北电网络',
    '飞鱼星',
    '磊科',
    '强氧',
    '腾达',
    '新格林耐特',
    '鑫威',
    '迅捷网络',
    '网卓',
    '汉柏',
    '恒捷通信',
    '嘉华众力',
    '博科',
    'LB-Link',
    '安奈特',
    '优肯',
    '居易科技',
    '维盟',
    '珠海鸿瑞',
    '启明星辰'
];
var srcLinks = [];
for (var filename of filenameList) {
    // 处理中文问题
    srcLinks.push(`http://192.168.75.233/public/images/device-detail-brand/${encodeURIComponent(filename)}.png`);
}

const dstpath = "./images";

function mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
    return false;
}

function downloadUrl(urlList) {
    mkdirSync(dstpath);

    for (const url_item of urlList) {

        const arg = url.parse(url_item);
        const fileName = decodeURIComponent(arg.pathname.split('/').slice(-1)[0]);
        const download_dstpath = dstpath + '/' + fileName;
        request(url_item).pipe(fs.createWriteStream(download_dstpath));
    }
}

downloadUrl(srcLinks);