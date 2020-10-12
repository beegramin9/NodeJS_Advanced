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

/* insert, update, delete는 실행되기만 하고 결과를 보여주지 않는다. */
/* 그래서 callback함수에 row 파라미터가 들어가지 않는다. */
let sql = `insert into song (title,lyrics)
values ('Dynamite','I came to dance')`;

/* sql문의 title,lyrics를 parameter로 줄 수 있어야 한다. */

conn.query(sql, (error, fields) => {
    if (error)
        console.log(error)
});

conn.end();