var buf = Buffer.from('aaaa', 'utf-8')
console.log(buf);
console.log(buf.toString('base64'));
//array元素只能是数字,否则会被0替换掉
console.log(Buffer.from(['a','a','a','a']));
console.log(Buffer.from([2,3,4,5,6]));
var b = 'bbbbbbb';
var len1 = buf.write(b);
console.log('length:' + len1);
console.log(buf);
var buf2 = Buffer.allocUnsafeSlow(7);
var len2 = buf2.write(b);
console.log('length:' + len2);
console.log(buf2);
console.log(buf2.toJSON());
console.log(Buffer.concat([buf,buf2],len1+len2));
