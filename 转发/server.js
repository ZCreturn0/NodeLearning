const express = require('express');
const request = require('request');
const app = express();

app.use('/powerCapacityList',(req,res) => {
    let url = 'http://2.eicg.cn/json/rest/powerCapacityList';
    request({
        url:url,
        method:'POST',
        json:true
    },(_err,_res,_resBody) => {
        console.log(_resBody);
        let name = [];
        let value = [];
        for(let item of _resBody.data){
            if(item.ups[0] && item.ups[0].value){
                name.push(item.room);
                value.push(item.ups[0].value);
            }
            else{
                name.push(item.room);
                value.push(0);
            }
        }
        let result = [['name','value']];
        for(let i=0;i<name.length;i++){
            result.push([name[i],value[i]]);
        }
        res.json(result);
    });
});

app.use('/getDevice',(req,res) => {
    let url = 'http://2.eicg.cn/json/screen/getDevice';
    request({
        url:url,
        method:'POST',
        json:true
    },(_err,_res,_resBody) => {
        console.log(_resBody);
        let name = _resBody.name;
        let value = _resBody.value;
        let result = [['name','value']];
        for(let i=0;i<name.length;i++){
            result.push([name[i],value[i]]);
        }
        res.json(result);
    });
});

app.use('/BigPower',(req,res) => {
    let url = 'http://2.eicg.cn/json/screen/BigPower';
    request({
        url:url,
        method:'POST',
        json:true
    },(_err,_res,_resBody) => {
        console.log(_resBody);
        let name = _resBody.time;
        let value = _resBody.value;
        let result = [['name','value']];
        for(let i=0;i<name.length;i++){
            result.push([name[i],value[i]]);
        }
        res.json(result);
    });
});

app.use('/BigHide',(req,res) => {
    let url = 'http://2.eicg.cn/json/screen/BigHide';
    request({
        url:url,
        method:'POST',
        json:true
    },(_err,_res,_resBody) => {
        console.log(_resBody);
        let name = _resBody.name;
        let value1 = _resBody.wendu;
        let value2 = _resBody.shidu;
        let result = [['name','温度','湿度']];
        for(let i=0;i<name.length;i++){
            result.push([name[i],value1[i],value2[i]]);
        }
        res.json(result);
    });
});

app.use('/alarmList',(req,res) => {
    let url = 'http://2.eicg.cn/json/screen/alarmList';
    request({
        url:url,
        method:'POST',
        json:true
    },(_err,_res,_resBody) => {
        console.log(_resBody);
        let result = [['机房名','设备','测点','时间','告警信息']];
        for(let item of _resBody.data){
            result.push(item);
        }
        res.json(result);
    });
});

app.use('/PUEData',(req,res) => {
    let url = 'http://2.eicg.cn/json/screen/PUEData';
    request({
        url:url,
        method:'POST',
        json:true
    },(_err,_res,_resBody) => {
        console.log(_resBody);
        let name = _resBody.name;
        let value = _resBody.value;
        let result = [name,value];
        res.json(result);
    });
});

app.use('/getAlarmCount',(req,res) => {
    let url = 'http://2.eicg.cn/json/alarmsGoUp/getAlarmsData';
    request({
        url:url,
        method:'POST',
        headers: {
            "content-type": "application/json",
        },
        body:{"state":2,"room":"","module":"","tag":"","userName":"admin","type":""},
        json:true
    },(_err,_res,_resBody) => {
        console.log(_resBody);
        let result = [['name','value']];
        result.push(['远程告警',_resBody.now]);
        result.push(['本地告警',_resBody.local]);
        res.json(result);
    });
});

const server = app.listen(8899,() => {
    console.log(8899)
})