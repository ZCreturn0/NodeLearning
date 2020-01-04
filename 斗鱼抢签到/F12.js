// 用户名
const USER = '聂总小秘书'; // 聂总小秘书     // 疯狂吸憨
// 关键字
const CONTENT = '全体'; // 全体

let event = document.createEvent('HTMLEvents');
event.initEvent("click", true, true);
let el = document.getElementById('js-barrage-list');
let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
let progressObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        let child = mutation.addedNodes[0];
        let user;
        if (child.getElementsByClassName('Barrage-nickName')[0]) {
            user = child.getElementsByClassName('Barrage-nickName')[0].innerText;
            console.log(user);
            let barrageContent = child.getElementsByClassName('Barrage-content');
            if (barrageContent.length) {
                let content = barrageContent[0].innerText;
                console.log(content);
                if (~user.indexOf(USER) && ~content.indexOf(CONTENT)) {
                    console.log('done');
                    let checkInBtn = document.getElementsByClassName('Autograph-tabBtn')[0];
                    checkInBtn.dispatchEvent(event);
                }
            }
        }
    });
});
progressObserver.observe(el, {
    childList: true
});