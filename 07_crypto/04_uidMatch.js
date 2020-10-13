const mysql = require('mysql');

const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
let conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
})

conn.connect();

function generateHash(sth) {
    const crypto = require('crypto')
    const shasum = crypto.createHash('sha256')
    shasum.update(sth)
    return shasum.digest('base64')
}

/* 사용자가 입력한 uid와 pwd를 각각 'admin', '1234'로 결정 */
let uid = 'admin'; /* 나중에 form으로 받은 이후엔 req.body.uid */
let pwd = '1234'; /* 나중에 form으로 받은 이후엔 req.body.pwd */

let pwdHash = generateHash(pwd);

let sql = "select * from users where uid like ?"

// let sql = `insert into users (uid, pwd, uname)
// values (?,?,?)`;
// let params = ['admin', output, '관리자'];

conn.query(sql, uid, (error, results, fields) => {
    if (error)
        console.log(error);
    // console.log(results);

    let result = results[0];
    // console.log(result.pwd); 하면 pwd가 undefined 됐다고 에러 발생
    // console.log(result);

    /* reusult가 undefined가 나오면 아이디가 달라서 로그인이 실패된 것 */
    if (!result) {
        console.log(`Sign in failed, ${uid} to be the wrong uid`);
    } else {
        if (result.pwd === pwdHash) {
            console.log('Signed in');
        } else {
            console.log(`Sign in failed, wrong password`)
        }
    }
});

conn.end();