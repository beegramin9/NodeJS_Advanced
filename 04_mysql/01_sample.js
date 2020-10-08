const mysql = require('mysql');
const fs = require('fs');

let info = fs.readFileSync('./mysql.json', 'utf8');
let connInfo = JSON.parse(info)

/* 얘도 하나의 객체 */
let conn = mysql.createConnection({
    host: connInfo.host,
    user: connInfo.user,
    password: connInfo.password,
    port: connInfo.port,
    database: connInfo.database
});

conn.connect();

/* 그리고 sql문 */
/* 데이터 불러오기 */
let sql = 'select * from city where population > 9e6';
conn.query(sql, (error, rows, fields) => {
    console.log(rows);
    for (let row of rows) {
        /* 속성 대소문자 구별! */
        console.log(row.ID, row.Name, row.CountryCode, row.District, row.Population);
    }
});


conn.end();