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

    }
    ,
    makeNewContent: function (params, callback) {
        let conn = this.getConnection()
        let sql = `INSERT into bbs (uid, title, content)
        VALUES(?,?,?)
        `
        /* 구문이 두개로 나눠져있네... 시발 */

        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`makeNewContent 에러 발생: ${error}`);

            console.log();
            /* 이게 왜 안 나오지? */
            callback();
        })
        /* 여기엔 문제가 없다. 하이디에서 잘 들어오니까 */

        /* 이제 여기서 뭘 받아와야 하는지... */
        /* select 해서 row를 받는게 아니니까 콜백이 없지 */
    },
}