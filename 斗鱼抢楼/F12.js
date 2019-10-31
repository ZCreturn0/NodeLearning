// 用户名
const USER = '聂总小秘书';
// 关键字
const CONTENT = '全体';

let event = document.createEvent('HTMLEvents');
event.initEvent("click", true, true);
let el = document.getElementById('js-barrage-list');
let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
let progressObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        let child = mutation.addedNodes[0];
        let user = child.getElementsByClassName('Barrage-nickName')[0].innerText;
        let content = child.getElementsByClassName('Barrage-content')[0].innerText;
        if (~user.indexOf(USER) && ~content.indexOf(CONTENT)) {
            console.log('done');
            let checkInBtn = document.getElementsByClassName('Autograph-tabBtn')[0];
            checkInBtn.dispatchEvent(event);
        }
    });
});
progressObserver.observe(el, {
    childList: true
});