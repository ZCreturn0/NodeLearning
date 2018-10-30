function Hello(){
    this.name = 'aaa';
    this.setName = function(name){
        this.name = name;
    }
    this.world = function(){
        console.log(`Hello ${this.name}!`);
    }
}
module.exports = Hello;