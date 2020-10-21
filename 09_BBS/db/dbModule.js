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
        SELECT bid AS bbs_bid, 
        title AS bbs_title, 
        uid AS users_uid, 
        DATE_FORMAT(modTime, '%y-%m-%d %T') AS bbs_modTime,
        replyCount as bbs_replyCount, 
        if (date(modTime) = DATE(NOW()),
			DATE_FORMAT(modTime, '%H:%i:%s'),
			DATE_FORMAT(modTime, '%Y-%m-%d')) AS bbs_modTime,
        viewCount AS bbs_viewCount  
        
        FROM bbs
        ORDER BY bbs_bid desc
        `
        /* 내가 이름 지어주는 걸 완료했으면 */
        /* order by 할 때는 내가 지어준 이름으로! */
        /* ORDER BY bbs_bid DESC LIMIT 30 */

        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(`mainPageGetLists 에러 발생: ${error}`);
            callback(rows);
        })
    },
    getTotalNumContent: function (offset, callback) {
        let conn = this.getConnection()
        let sql = `
        SELECT bid AS bbs_bid, 
        title AS bbs_title, 
        uid AS users_uid, 
        DATE_FORMAT(modTime, '%y-%m-%d %T') AS bbs_modTime,
        replyCount as bbs_replyCount, 
        if (date(modTime) = DATE(NOW()),
			DATE_FORMAT(modTime, '%H:%i:%s'),
			DATE_FORMAT(modTime, '%Y-%m-%d')) AS bbs_modTime,
        viewCount AS bbs_viewCount  
        
        FROM bbs
        ORDER BY bbs_bid desc
        limit 10 offset ?
        `
        /* 내가 이름 지어주는 걸 완료했으면 */
        /* order by 할 때는 내가 지어준 이름으로! */
        /* ORDER BY bbs_bid DESC LIMIT 30 */

        conn.query(sql, offset, (error, rows, fields) => {
            if (error)
                console.log(`mainPageGetLists 에러 발생: ${error}`);
            callback(rows);
        })
    },




    searchKeywordGetLists: function (searchKeyword, callback) {
        let conn = this.getConnection()
        let sql = `
        SELECT bbs.bid AS bbs_bid, 
        bbs.title AS bbs_title, 
        bbs.uid AS users_uid, 
        DATE_FORMAT(bbs.modTime, '%y-%m-%d %T') AS bbs_modTime,
        bbs.replyCount as bbs_replyCount, 
        if (date(modTime) = DATE(NOW()),
			DATE_FORMAT(modTime, '%H:%i:%s'),
			DATE_FORMAT(modTime, '%Y-%m-%d')) AS bbs_modTime,
        bbs.viewCount AS bbs_viewCount  
        
        FROM bbs 
        WHERE bbs.title LIKE ?
        `
        /* 내가 이름 지어주는 걸 완료했으면 */
        /* order by 할 때는 내가 지어준 이름으로! */
        /* ORDER BY bbs_bid DESC LIMIT 30 */

        conn.query(sql, searchKeyword, (error, rows, fields) => {
            if (error)
                console.log(`searchKeywordGetLists 에러 발생: ${error}`);
            callback(rows);
        })
    },
    getContent: function (bid, callback) {
        let conn = this.getConnection()
        /* 아마 이것도 full outer join인가봐... */
        /* 테이블 3개 합치기 */
        /* params로 들어가는 건 잘 받았는데. */
        /* 여기서 bbs_bid를 제대로 안 주니까 다 1001로 나오잖아 */
        let sql = `
        SELECT bbs.title as bbs_title,
        bbs.bid as bbs_bid,
        DATE_FORMAT(bbs.modTime, '%y-%m-%d %T') as bbs_modTime,
        users.uname AS users_uname,
        bbs.viewCount as bbs_viewCount, 
        reply.NumComments as reply_NumComments,
        bbs.content as bbs_content, 
        reply.comments as reply_comments, 
        reply.isMine as reply_isMine
        FROM bbs 
        LEFT outer JOIN reply 
        ON bbs.bid = reply.bid
        LEFT OUTER JOIN users
        ON USERs.uid = bbs.uid 
        WHERE bbs.isDeleted = 0 and bbs.bid = ?
    
        `
        conn.query(sql, bid, (error, results, fields) => {
            if (error)
                console.log(`getContent 에러 발생: ${error}`);
            callback(results[0])
        })
    },
    /* 내댓글, 남의댓글 바꿔야겠네... */

    getUserInfo: function (uid, callback) {
        let conn = this.getConnection()
        let sql = `select uid,
                    pwd, 
                    uname
                    from users where uid like ?`
        conn.query(sql, uid, (error, results, fields) => {
            if (error)
                console.log(`getUserInfo 에러 발생: ${error}`);
            callback(results[0]);
        })
    },
    newUser: function (params, callback) {
        let conn = this.getConnection()
        let sql = `insert into users (uid, pwd, uname, tel, email)
            values (?,?,?,?,?)`
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`newUser 에러 발생: ${error}`);
            callback();
        })

    },
    createContent: function (params, callback) {
        let conn = this.getConnection()
        let sql = `INSERT into bbs (uid, title, content)
        VALUES(?,?,?)
        `
        /* 구문이 두개로 나눠져있네... 시발 */

        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`createContent 에러 발생: ${error}`);

            console.log();
            /* 이게 왜 안 나오지? */
            callback();
        })
        /* 여기엔 문제가 없다. 하이디에서 잘 들어오니까 */

        /* 이제 여기서 뭘 받아와야 하는지... */
        /* select 해서 row를 받는게 아니니까 콜백이 없지 */
    },
    /* showNewContent 같은것도 만들어야 하나? */
    /* getContent를 쓰면 됨 */
    getBid: function (callback) {
        let conn = this.getConnection()
        let sql = `select bid from bbs order by bid desc LIMIT 1;`
        conn.query(sql, (error, result_bid, fields) => {
            if (error)
                console.log(`getBid 에러 발생: ${error}`);
            callback(result_bid[0]);
        })

    },
    contentToUpdate: function (bid, callback) {
        let conn = this.getConnection();
        /* 여기서 uname을 받아야 함 */
        // let sql = `select * from bbs where bid =?`
        let sql = `SELECT bbs.bid AS bbs_bid,
        bbs.title AS bbs_title,
        bbs.content AS bbs_content,
        users.uname AS users_uname 
        FROM bbs
        left outer JOIN users
        ON users.uid = bbs.uid
        where bid = ?
        `
        conn.query(sql, bid, (error, rows, fields) => {
            if (error)
                console.log(`contentToUpdate 에러 발생: ${error}`);
            callback(rows[0])
        })
    },
    updateContent: function (params, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set title=?, content=? where bid=?  `
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`updateContent 에러 발생: ${error}`);
            callback()
        })
    },
    deleteContent: function (bid, callback) {
        let conn = this.getConnection();
        let sql = `delete from bbs where bid = ?`
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(`deleteContent 에러 발생: ${error}`);
            callback()
        })
    },

    /* viewCount 올리는 함수도 해야 함 */

    increaseViewCount: function (bid, callback) {
        let conn = this.getConnection()
        let sql = `update bbs set viewCount = viewCount + 1
                    where bid = ?`
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(`increaseViewCount 에러 발생: ${error} `);
            callback();
        })
    },


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
    },
    getDisplayTime: function (dt) {
        let today = moment().format('YYYY-MM-DD')
        let dbtime = moment(dt).format('YYYY-MM-DD')
        return (dbtime.indexOf(today) == 0) ?
            dbtime.substring(11) : dbtime.substring(0, 10)
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