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
    getAllUsersForAdmin: function (offset, callback) {
        let conn = this.getConnection()
        let sql = `
        SELECT uid, uname, tel, email, 
        DATE_FORMAT(regDate, '%y-%m-%d %T') as regDate
        FROM users
        WHERE isDeleted = 0
        ORDER BY regDate desc
        limit 10 OFFSET ?
        `
        /* 내가 이름 지어주는 걸 완료했으면 */
        /* order by 할 때는 내가 지어준 이름으로! */
        /* ORDER BY bbs_bid DESC LIMIT 30 */

        conn.query(sql, offset, (error, rows, fields) => {
            if (error)
                console.log(`getAllUsersForAdmin 에러 발생: ${error}`);
            callback(rows);
        })


    },
    getTotalNumUsers: function (callback) {
        let conn = this.getConnection()
        let sql = `
        SELECT COUNT(*) AS users_count FROM users
        WHERE isDeleted = 0 
            `
        /* 내가 이름 지어주는 걸 완료했으면 */
        /* order by 할 때는 내가 지어준 이름으로! */
        /* ORDER BY bbs_bid DESC LIMIT 30 */

        conn.query(sql, (error, result, fields) => {
            if (error)
                console.log(`mainPageGetLists2 에러 발생: ${error}`);
            callback(result[0]);
        })
    },

    myPageInfo: function (uname, callback) {
        let conn = this.getConnection()
        let sql = `
        SELECT uid, uname, tel, email
        FROM users
        WHERE uname = ?
        `

        conn.query(sql, uname, (error, result, fields) => {
            if (error)
                console.log(`myPageInfo 에러 발생: ${error}`);
            callback(result[0]);
        })

    },
    updateMyInfo: function (params, callback) {
        let conn = this.getConnection();
        let sql = `update users set uname=?, tel=?, email = ? where uid = ?`
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`updateContent 에러 발생: ${error}`);
            callback()
        })
    },

    updatePwdUser: function (params, callback) {
        let conn = this.getConnection()
        /*  사용자 아이디, 패스워드, 패스워드확인, 이름 */
        let sql = `update users set pwd = ? where uname = ?`

        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`updatePwdUser 에러 발생: ${error} `);
            callback();
        })
    }
}