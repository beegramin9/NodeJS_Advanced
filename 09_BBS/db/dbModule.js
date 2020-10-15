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
    mainPageGetLists: function (callback) {
        let conn = this.getConnection()
        let sql = `
            SELECT bbs.bid as bbs_bid  , 
	        bbs.title as bbs_title, 
	        users.uid as users_uid, 
            DATE_FORMAT(bbs.modTime, '%y-%m-%d %T') as bbs_modTime,
	        bbs.viewCount as bbs_viewCount, 
	        reply.NumComments as reply_NumComments
	        FROM bbs
	        JOIN users
	        ON bbs.uid = users.uid
	        JOIN reply
	        ON bbs.bid = reply.bid
	        WHERE bbs.isDeleted = 0`
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(`mainPageGetLists 에러 발생: ${error}`);
            callback(rows);
        })
    },
    getContent: function (bid, callback) {
        let conn = this.getConnection()
        let sql = `
            SELECT bbs.title as bbs_title, 
            bbs.bid as bbs_bid, 
            DATE_FORMAT(bbs.modTime, '%y-%m-%d %T') as bbs_modTime,
            USERs.uid as users_uid,
            bbs.viewCount as bbs_viewCount, 
            reply.NumComments as reply_NumComments,
            bbs.content as bbs_content, 
            reply.comments as reply_comments, 
            reply.isMine as reply_isMine
            FROM bbs
            JOIN users
            ON bbs.uid = users.uid
            JOIN reply
            ON bbs.bid = reply.bid
            WHERE bbs.isDeleted=0 and bbs.bid like ?
            `
        conn.query(sql, bid, (error, results, fields) => {
            if (error)
                console.log(`getContent 에러 발생: ${error}`);
            callback(results[0])
            console.log(results[0]);
        })
    },
    /* 내댓글, 남의댓글 바꿔야겠네... */
    newUser: function (params, callback) {
        let conn = this.getConnection()
        let sql = `insert into users (uid, pwd, uname, tel, email)
        values(?,?,?,?,?)`
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`newUser 에러 발생: ${error}`);
            callback()
        })
    }


    ,
    updatePwdUser: function (params, callback) {
        let conn = this.getConnection()
        /*  사용자 아이디, 패스워드, 패스워드확인, 이름 */
        let sql = `insert into users (uid, pwd, uname, tel, email)
        values(?,?,?,?,?)`

        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`updatePwdUser 에러 발생: ${error} `);
            callback();
        })
    }






















    ,
    getUserInfo: function (uid, callback) {
        let conn = this.getConnection()
        let sql = `select uid, pwd, uname, DATE_FORMAT(regDate, '%y-%m-%d %T') AS regDate from users where uid like ? `
        conn.query(sql, uid, (error, results, fields) => {
            if (error)
                console.log(`getUserInfo 에러 발생: ${error} `);
            callback(results[0]);
        })
    },
    deleteUser: function (uid, callback) {
        let conn = this.getConnection()
        let sql = `update users set isDeleted = 1 where uid like ? `
        conn.query(sql, uid, (error, fields) => {
            if (error)
                console.log(`deleteUser 에러 발생: ${error} `);
            callback();
        })
    },
    updatePwdUser: function (params, callback) {
        let conn = this.getConnection()
        let sql = `update users set pwd =? where uid like ? `
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`updatePwdUser 에러 발생: ${error} `);
            callback();
        })
    }
}