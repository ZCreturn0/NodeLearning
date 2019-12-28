var ws = new WebSocket('wss://localhost:8089/', {
    protocolVersion: 8,
    origin: 'https://localhost:8089',
    rejectUnauthorized: false //重要，自签名证书只能这样设了。CA颁发的受信任证书就不需要了
});