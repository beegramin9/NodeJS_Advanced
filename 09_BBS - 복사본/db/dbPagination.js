const mysql = require('mysql');

const fs = require('fs');
const { callbackify } = require('util');
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
    pagination: function (callback) {
        let conn = this.getConnection()
        let sql = `SELECT bbs.bid AS bbs_bid, 
        bbs.title AS bbs_title, 
        bbs.uid AS users_uid, 
        DATE_FORMAT(bbs.modTime, '%y-%m-%d %T') AS bbs_modTime,
        bbs.replyCount as bbs_replyCount, 
        if (date(modTime) = DATE(NOW()),
			DATE_FORMAT(modTime, '%H:%i:%s'),
			DATE_FORMAT(modTime, '%Y-%m-%d')) AS bbs_modTime,
        bbs.viewCount AS bbs_viewCount  
        
        FROM bbs
        ORDER BY bbs_bid desc`
        conn.query(sql, function (err, rows) {
            if (err) console.error("err : " + err);
            // callback(rows)
            res.render('page', { title: ' 게시판 리스트', rows: rows, page: page, length: rows.length - 1, page_num: 10, pass: true });
            console.log(rows.length - 1);
        });
    }
}