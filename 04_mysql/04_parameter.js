const mysql = require('mysql');
const fs = require('fs');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info)

let conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});

conn.connect();

let sql = `insert into song (title,lyrics)
values (?,?)`;

/* sql문의 title,lyrics를 parameter로 줄 수 있어야 한다. */
/* 객체로 주는 게 아니라 array로 준다 */
let params = ['Dua lipa', 'Pocketful of honey'];

conn.query(sql, params, (error, fields) => {
    if (error)
        console.log(error)
    /* 전역변수와 로컬변수의 차이 */
    let sql = `SELECT * FROM song ORDER BY sid DESC LIMIT 3`;
    conn.query(sql, (error, rows, fields) => {
        if (error);
        console.log(error);

        for (let row of rows) {
            console.log(row.sid, row.title, row.lyrics);
        }
    })
    conn.end();
});
