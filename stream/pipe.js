const fs = require('fs');

var writeStream = fs.createWriteStream('copy.txt');
var readStream = fs.createReadStream('output.txt');
readStream.pipe(writeStream);