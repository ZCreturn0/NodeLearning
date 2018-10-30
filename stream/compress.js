const fs = require('fs');
const zlib = require('zlib');

var readStream = fs.createReadStream('output.txt');
readStream.pipe(zlib.createGzip()).pipe(fs.createWriteStream('output.gz'));