const mysql = require('mysql');

const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

module.exports = {
    getConnection: function () {
        let conn = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port
        })
        conn.connect((error) => {
            if (error)
                console.log(`getConnection 에러 발생: ${error}`);
        })
        return conn;
    },
    pagination: function () {
        let conn = this.getConnection()
        let sql = ``




        conn.query(sql, function (err, rows) {
            if (err) console.error("err : " + err);
            res.render('page', { title: ' 게시판 리스트', rows: rows, page: page, length: rows.length - 1, page_num: 10, pass: true });
            console.log(rows.length - 1);
        });
    }
}