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

/* 여러개 주려면 2차원 배열 */
let params = [
    ['Dua lipa', 'Pocketful of honey'],
    ['Dua lipa', 'If you wanna run away']
];

conn.query(sql, params, (error, fields) => {
    if (error)
        console.log(error)
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
