const fs = require('fs');

fs.appendFile('./mkdir/append.txt', 'aaa\r\n阿斯达斯多\r\n斯蒂芬斯蒂芬\r\n', 'utf-8', err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('done');
    }
});