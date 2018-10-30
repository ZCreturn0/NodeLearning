const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('output.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('unzip.txt'));