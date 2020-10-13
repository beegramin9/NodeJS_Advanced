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
    getAllLists: function (callback) {
        let conn = this.getConnection()
        let sql = `SELECT uid, uname, DATE_FORMAT(regDate, '%y-%m-%d %T') AS regDate
        FROM users where isDeleted=0
        ORDER BY regDate desc LIMIT 10`
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(`getAllLists 에러 발생: ${error}`);
            callback(rows);
        })
    },
    getUserInfo: function (uid, callback) {
        let conn = this.getConnection()
        let sql = `select uid, pwd, uname, DATE_FORMAT(regDate, '%y-%m-%d %T') AS regDate from users where uid like ?`
        conn.query(sql, uid, (error, results, fields) => {
            if (error)
                console.log(`getUserInfo 에러 발생: ${error}`);
            callback(results[0]);
        })
    },
    generateHash: function (sth) {
        const crypto = require('crypto')
        const shasum = crypto.createHash('sha256')
        shasum.update(sth)
        return shasum.digest('base64')
    }
}