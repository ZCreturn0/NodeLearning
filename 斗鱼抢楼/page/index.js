let btn = document.getElementById('btn');
let input = document.getElementById('keyWords');
btn.onclick = () => {
    let val = input.value.split(' ');
    let postData = {
        keywords: val
    };
    fetch('../setKeyWords', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(postData)
    }).then(function (response) {
        console.log(response);
    });
};