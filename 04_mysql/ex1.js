const mysql = require('mysql');
const fs = require('fs');

let info = fs.readFileSync('./mysql.json', 'utf8');
let connInfo = JSON.parse(info)

let conn = mysql.createConnection({
    host: connInfo.host,
    user: connInfo.user,
    password: connInfo.password,
    port: connInfo.port,
    database: connInfo.database
});

conn.connect();

let sql = `SELECT NAME, DATE_FORMAT(debut,'%Y-%m-%d') AS date_info
FROM girl_group
WHERE DATE_FORMAT(debut,'%Y')=2009`;
conn.query(sql, (error, rows, fields) => {
    for (let row of rows) {
        /* 속성 대소문자 구별! */
        console.log(row.NAME, row.date_info);
    }
});


conn.end();