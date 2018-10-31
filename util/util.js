const util = require('util');

function Base(){
    this.innerAttr = 'aaa';
    this.innerFunc = function(){
        console.log(this.innerAttr);
    }
}
Base.prototype.outerAttr = 'bbb';
Base.prototype.outerFunc = function(){
    console.log(this.outerAttr);
}

var base = new Base();
base.innerFunc();
base.outerFunc();

function Sub(){

}
//只继承prototype
util.inherits(Sub,Base);
var sub = new Sub();
sub.outerFunc();
//log不会输出prototype
console.log(sub);
console.log('-------------------------');
console.log(util.inspect(base));
console.log(util.inspect(base,true,null,true));
console.log('-------------------------');
console.log(util.isArray([]));
console.log(util.isArray({}));
console.log('-------------------------');
console.log(util.isRegExp([]));
console.log(util.isRegExp(null));
console.log(util.isRegExp(/a/));
console.log('-------------------------');
console.log(util.isDate(new Date()));
console.log(util.isDate(Date()));
console.log(util.isDate('2012-01-02 12:45:31'));
console.log('-------------------------');
console.log(util.isError(new Error()));
console.log(util.isError(new TypeError()));
console.log(util.isError({}));