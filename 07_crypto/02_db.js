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

const crypto = require('crypto')
const shasum = crypto.createHash('sha256')
shasum.update('1234')
let output = shasum.digest('base64')

// let sql = `insert into users (uid, pwd, name, isDeleted, regDate)
// values ('admin','${output}','관리자',default,default)`

/* 이렇게 해도 되고 */
// let sql = `insert into users (uid, pwd, name)
// values ('admin','${output}','관리자')`
// 처럼 default로 들어가는 행은 아예 안 넣어도 된다.

let sql = `insert into users (uid, pwd, uname) values (?,?,?)`;

let params = ['yhlee', output, '이용훈'];

conn.query(sql, params, (error, fields) => {
    if (error)
        console.log(error);
});

conn.end();