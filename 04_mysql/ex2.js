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

let sql = `SELECT gg.name,  DATE_FORMAT(gg.debut,'%Y-%m-%d') AS debut, s.title
FROM girl_group AS gg
joiN song AS s
ON s.sid = gg.hit_song_id
where DATE_format(gg.debut, '%Y')=2009`;
conn.query(sql, (error, rows, fields) => {
    for (let row of rows) {
        /* 속성 대소문자 구별! */
        console.log(row.name, row.debut, row.title);
    }
});


conn.end();