const robot = require("robotjs");

let index = 0;
let timer = null;

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

timer = setInterval(async () => {
    if (index++ < 100) {
        robot.mouseClick();
    }
    else {
        await sleep(5000);
        index = 0;
    }
}, 0.1 * 1000);