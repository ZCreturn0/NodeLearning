const express = require('express');
const request = require('request');
const app = express();

app.use('/powerCapacityList',(req,res) => {
    let url = 'http://183.2.185.152/json/rest/powerCapacityList';
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
    let url = 'http://183.2.185.152/json/screen/getDevice';
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
    let url = 'http://183.2.185.152/json/screen/BigPower';
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
            result.push([name[i],Math.abs(value[i])]);
        }
        res.json(result);
    });
});

app.use('/BigHide',(req,res) => {
    let url = 'http://183.2.185.152/json/screen/BigHide';
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
    let url = 'http://183.2.185.152/json/screen/alarmList';
    request({
        url:url,
        method:'POST',
        json:true
    },(_err,_res,_resBody) => {
        console.log(_resBody);
        let result = [['机房名','设备','测点','时间','告警级别']];
        for(let item of _resBody.data){
            result.push(item);
        }
        res.json(result);
    });
});

app.use('/PUEData',(req,res) => {
    // let url = 'http://183.2.185.152/json/screen/PUEData';
    // request({
    //     url:url,
    //     method:'POST',
    //     json:true
    // },(_err,_res,_resBody) => {
    //     console.log(_resBody);
    //     let name = _resBody.name;
    //     let value = _resBody.value;
    //     let result = [name,value];
    //     res.json(result);
    // });
    request({
        url: 'http://183.2.185.152/arbiter/rest/generalPower/project_dev?zom=0&roomid=&armId=',
        method: 'get'
    }, (_err, _res, zom0) => {
            request({
                url: 'http://183.2.185.152/arbiter/rest/generalPower/project_dev?zom=1&roomid=&armId=',
                method: 'get'
            }, (_err, _res, zom1) => {
                    let result = ['value', (zom1 / zom0).toFixed(2)];
                    res.json(result);
            })
    });
});

app.use('/getAlarmCount',(req,res) => {
    let url = 'http://183.2.185.152/json/alarmsGoUp/getAlarmsData';
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

app.use('/getMaps', (req, res) => {
    let url = 'http://183.2.185.152/json/screen/getMaps';
    request({
        url: url,
        method: 'POST',
        json: true
    }, (_err, _res, _resBody) => {
        console.log(_resBody);
        let result = [["lat", "lng", "label", "name", "value", "text"]];
        for (let item of _resBody.data){
            result.push([item.address_xcode.split(',')[1] - 0, item.address_xcode.split(',')[0] - 0, item.note, item.room, item.msg_warn, item.msg_warn == 0 ? item.room + '在线' : item.room + '离线']);
        }
        res.json(result);
    });
});

const server = app.listen(8899,() => {
    console.log(8899)
})