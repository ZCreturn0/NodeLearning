const mysql = require('mysql');
const config = require('./db.json');
const POOL = mysql.createPool(config);

const TABLE_NAME = 'post';

function go() {
    let promises = [];
    for (let i = 0;i < 3; i++) {
        promises.push(log('aa' + i, 'aaaaa', 'ccccc', i + 'asassssss'));
    }
    Promise.all(promises)
    .then(res => {
        console.log(res);
    })
}

go();

function log(post_id, post_title, post_user, post_user_safe_id) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${TABLE_NAME}(post_id, post_title, post_user, post_user_safe_id) VALUES(?,?,?,?)`;
        let sqlParams = [post_id, post_title, post_user, post_user_safe_id];
        POOL.getConnection((err, connection) => {
            connection.query(sql, sqlParams, (err, res) => {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    });
}

setTimeout(() => {
    POOL.end();
}, 10 * 1000);