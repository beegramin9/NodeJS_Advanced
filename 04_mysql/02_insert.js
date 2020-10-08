const mysql = require('mysql')
const fs = require('fs')

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

let image = "https://placeimg.com/100/100/any"
let name = "유강남"
let birthday = "911004"
let gender = "남자"
let job = "야구선수"
let params = [image, name, birthday, gender, job]

const sql = ``;

conn.query(sql, (e, rows) => {
    if (e)
        console.log(e);
})

conn.end();