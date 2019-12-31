let Service = require('node-windows').Service;

let svc = new Service({
    name: 'node_service', //服务名称
    description: 'node服务器', //描述
    script: './server.js' //nodejs项目要启动的文件路径
});

svc.on('install', () => {
    svc.start();
});

svc.install();