const http = require('http')
const url = require('url')
const mysql = require('mysql');
const fs = require('fs');
const db = require('./db')

/* 패스워드를 숨기기 위한 과정 */
let info = fs.readFileSync('./mysql.json', 'utf8');
let connInfo = JSON.parse(info)

let conn = mysql.createConnection({
    host: connInfo.host,
    user: connInfo.user,
    password: connInfo.password,
    port: connInfo.port,
    database: connInfo.database
});

let sql = `SELECT  cit.name, cit.population, lng.language
FROM	city AS cit
INNER JOIN countrylanguage AS lng
ON lng.countrycode = cit.countrycode
WHERE lng.isofficial = 'T'
ORDER BY cit.population DESC
LIMIT 10`;



http.createServer((req, res) => {
    // conn.connect();
    conn.query(sql, (error, rows, fields) => {
        let content = '';
        for (let row of rows) {
            content += `<tr>
            <td>${row.name}</td>
            <td>${row.population}</td>
            <td>${row.language}</td>
            </tr>
            `
        }
        let index = db.html(content)
        res.end(index)
    });
    // conn.end();


}).listen(3000, () => {
    console.log('Server running at http//localhost:3000')
})

/* 이 코드는 새로고침할때마다 표가 중복으로 더해집니다. */