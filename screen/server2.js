const express = require('express');
const request = require('request');
const cityJson = require('./area.js');
const app = express();

var baseurl = 'http://10.25.252.158:8080';

var areaJson = {};
for (let item of cityJson){
    areaJson[item.item_code] = item.item_name;
}

// ups占比
app.use('/upsData', (req, res) => {
    let url = `${baseurl}/json/screen/upsData`;
    request({
        url: url,
        method: 'POST',
        json: true
    }, (_err, _res, _resBody) => {
        console.log(_resBody);
        var result = [];
        if (_resBody && _resBody.name) {
            result.push(['name', 'value']);
            for (var i = 0; i < _resBody.name.length; i++) {
                result.push([_resBody.name[i], _resBody.value[i].toFixed(2) - 0]);
            }
        }
        res.json(result);
    });
});

// PUE
app.use('/PUEData', (req, res) => {
    let url = `${baseurl}/json/screen/PUEData`;
    request({
        url:url,
        method:'POST',
        json:true
    },(_err,_res,_resBody) => {
        console.log(_resBody);
        if (_resBody && _resBody.name) {
            res.json([_resBody.name[0], (_resBody.value[0] + 1).toFixed(2)]);
        }
        else{
            res.json([]);
        }
    });
});

// 温湿度
app.use('/highWenShiDu', (req, res) => {
    let url = `${baseurl}/json/screen/highWenShiDu`;
    request({
        url: url,
        method: 'POST',
        json: true
    }, 
    (_err, _res, _resBody) => {
        console.log(_resBody);
        var result = {};
        if (_resBody && _resBody.shidu) {
            var shidu = _resBody.shidu.slice(0, 6);
            var wendu = _resBody.wendu.slice(0, 6);
            wendu = wendu.reverse();
            result.shidu = [];
            result.wendu = [];
            result.shidu.push(['name', '温度', '湿度']);
            result.wendu.push(['name', '温度', '湿度']);
            for (let item of shidu) {
                result.shidu.push([item.arm_name, 0, item.avg.toFixed(2) - 0]);
            }
            for (let item of wendu) {
                result.wendu.push([item.arm_name, item.avg.toFixed(2) - 0, 0]);
            }
        }
        res.json(result);
    });
});

// 告警
app.use('/alarmList', (req, res) => {
    let url = `${baseurl}/json/screen/alarmList`;
    request({
        url: url,
        method: 'POST',
        json: true
    }, (_err, _res, _resBody) => {
        console.log(_resBody);
        let result = [['机房名', '设备', '测点', '时间', '告警级别']];
        if (_resBody && _resBody.data) {
            for (let item of _resBody.data) {
                result.push(item);
            }
        }
        res.json(result);
    });
});

// 各区设备
app.use('/getModuleSum', (req, res) => {
    let url = `${baseurl}/json/screen/getModuleSum`;
    request({
        url: url,
        method: 'POST',
        json: true
    }, (_err, _res, _resBody) => {
        var getName = function(xcode){
            return areaJson[xcode];
        }
        console.log(_resBody);
        var result = [];
        result.push(['name','value']);
        if (_resBody && _resBody.name) {
            for (var i = 0; i < _resBody.name.length; i++) {
                result.push([getName(_resBody.name[i].substring(12, 18)), _resBody.value[i] - 0]);
            }
        }
        res.json(result);
    });
});

// 地图
app.use('/getMapByArea', (req, res) => {
    let url = `${baseurl}/json/screen/getMapByArea`;
    request({
        url: url,
        method: 'POST',
        json: true
    }, 
    (_err, _res, _resBody) => {
        console.log(_resBody);
        var result = [];
        if (_resBody && _resBody.data) {
            for (let item of _resBody.data) {
                result.push({
                    lat: item.map_xy.split(',')[1],
                    lng: item.map_xy.split(',')[0],
                    label: item.name,
                    name: item.name,
                    value: item.sum,
                    text: `${item.name} ${item.sum} 机房`
                });
            }
        }
        res.json(result);
    });
});

// 告警数
app.use('/getAlarmCount', (req, res) => {
    let url = `${baseurl}/json/alarmsGoUp/getAlarmsData`;
    request({
        url: url,
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: { "state": 2, "room": "", "module": "", "tag": "", "userName": "admin", "type": "" },
        json: true
    }, (_err, _res, _resBody) => {
        console.log(_resBody);
        let result = [['name', 'value']];
        if (_resBody && _resBody.now) {
            result.push(['远程告警', _resBody.now]);
            result.push(['本地告警', _resBody.local]);
            result.push(['lv1', _resBody.lv1]);
            result.push(['lv2', _resBody.lv2]);
            result.push(['lv3', _resBody.lv3]);
        }
        res.json(result);
    });
});

const server = app.listen(8899, () => {
    console.log(8899)
})