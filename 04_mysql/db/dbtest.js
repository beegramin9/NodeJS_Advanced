const fs = require('fs');
const mysql = require('mysql');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info)

function getConnection() {
    let conn = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: config.database
    });
    conn.connect((error) => {
        console.log(error)
    });
    return conn;
}

// let sql = 'delete from song where sid=?';
// let conn = getConnection()
// conn.query(sql, 123, (error, fields) => {
//     if (error)
//         console.log(error);

//     callback();
// })

let sql = 'select * from song where sid=?'
let conn = getConnection();
conn.query(sql, 123, (error, rows, fields) => {
    if (error)
        console.log(`에러발생 ${error}`);
    console.log(rows);
    // callback(rows);
})
conn.end();