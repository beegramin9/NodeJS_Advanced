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

let sql = `SELECT con.continent, con.name as country, cit.name as city, cit.population
FROM city AS cit
inner join country AS con
ON cit.countrycode = con.code
WHERE con.continent = 'asia'
ORDER BY cit.population desc
LIMIT 10`;
conn.query(sql, (error, rows, fields) => {
    for (let row of rows) {
        /* 속성 대소문자 구별! */
        console.log(row.continent, row.country, row.city, row.population);
    }
});


conn.end();