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

let sql = `SELECT  cit.name, cit.population, lng.language
FROM	city AS cit
INNER JOIN countrylanguage AS lng
ON lng.countrycode = cit.countrycode
WHERE lng.isofficial = 'T'
ORDER BY cit.population DESC
LIMIT 10`;
conn.query(sql, (error, rows, fields) => {
    for (let row of rows) {
        /* 속성 대소문자 구별! */
        console.log(row.name, row.population, row.language);
    }
});


conn.end();