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

let sql = `SELECT continent, COUNT(NAME) AS num_con, SUM(gnp) as sum_gnp, round(AVG(gnp)) AS avg_gnp FROM country 
GROUP BY continent`;
conn.query(sql, (error, rows, fields) => {
    for (let row of rows) {
        /* 속성 대소문자 구별! */
        console.log(row.continent, row.num_con, row.sum_gnp, row.avg_gnp);
    }
});


conn.end();