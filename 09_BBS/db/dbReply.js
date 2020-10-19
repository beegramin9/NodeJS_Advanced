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
    getMyComment: function (bid, callback) {
        /* bid랑 isMine이 필요함 */
        let conn = this.getConnection()
        /* 아마 이것도 full outer join인가봐... */
        /* 테이블 3개 합치기 */
        /* params로 들어가는 건 잘 받았는데. */
        /* 여기서 bbs_bid를 제대로 안 주니까 다 1001로 나오잖아 */
        let sql = `
        SELECT users.uname as reply_uname, 
		reply.comments as reply_comments, 
		reply.regTime as reply_regTime,
		reply.bid as reply_bid
	    FROM reply
	    LEFT JOIN users
	    ON users.uid = reply.uid
	    WHERE isMine = 0 and bid = ?
        `
        conn.query(sql, bid, (error, rows, fields) => {
            if (error)
                console.log(`getMyComment 에러 발생: ${error}`);
            callback(rows)
        })
    },

    getOthersComment: function (bid, callback) {
        /* bid랑 isMine이 필요함 */
        let conn = this.getConnection()
        let sql = `
        SELECT users.uname as reply_uname, 
		reply.comments as reply_comments, 
		reply.regTime as reply_regTime,
		reply.bid as reply_bid
	    FROM reply
	    LEFT JOIN users
	    ON users.uid = reply.uid
        WHERE isMine = 1 and bid = ?
        `
        conn.query(sql, bid, (error, rows, fields) => {
            if (error)
                console.log(`getOthersComment 에러 발생: ${error}`);
            callback(rows)
        })
    }
    ,
    createMyComment: function (params, callback) {
        let conn = this.getConnection()
        let sql = ` INSERT INTO reply (bid, uid, comments)
        VALUES (?, ?, ?)
        `
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`makeNewContent 에러 발생: ${error}`);
            console.log();
            /* 이게 왜 안 나오지? */
            callback();
        })
    },
    /* 댓글은 수정이 안 되도록, 실제로 안 되잖아 */
    deleteMyComment: function (rid, callback) {
        let conn = this.getConnection()
        let sql = ` delete from reply where rid = ?`
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`deleteMyComment 에러 발생: ${error}`);
            console.log();
            /* 이게 왜 안 나오지? */
            callback();
        })
    }

}