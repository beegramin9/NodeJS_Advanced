const fs = require('fs');
const mysql = require('mysql');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info)


module.exports = {
    /* 모듈 만들 때는 화살표함수 쓰면 안 됨 */

    getConnection: function () {
        let conn = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port
        });
        conn.connect((error) => {
            console.log(`에러발생 ${error}`)
        });
        return conn;
    },
    getAllLists: function (callback) {
        let conn = this.getConnection();
        /* connection 여기서 받았으니까 */
        /* 본문에서는 .connect()랑 .end()를 사용하면 안 되겠지! */
        let sql = "SELECT * FROM song ORDER by sid DESC LIMIT 5";
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows)
        });

    },
    getJoinLists: function (callback) {
        let conn = this.getConnection();
        /* connection 여기서 받았으니까 */
        /* 본문에서는 .connect()랑 .end()를 사용하면 안 되겠지! */
        let sql = `SELECT song.sid, song.title, gg.name, song.lyrics FROM song
        LEFT JOIN girl_group AS gg
        ON song.sid = gg.hit_song_id
        ORDER by song.sid DESC`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows)
        });

    },
    insertSong: function (params, callback) {
        let sql = `insert into song (title,lyrics)
        values (?,?)`;

        // conn.connect();
        let conn = this.getConnection();
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);

            callback();
            /* 비동기할 때 return이라고 생각하면 됨. */
            /* 비동기로 하니까 콜백을 써줘야 하잖아 */
        });
    },
    deleteSong: function (sid, callback) {
        let sql = 'delete from song where sid=?';
        let conn = this.getConnection();
        conn.query(sql, sid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        })
    },
    getSong: function (sid, callback) {
        let sql = 'select * from song where sid=?'
        let conn = this.getConnection();
        conn.query(sql, sid, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows[0]);
        })
    },
    updateSong: function (params, callback) {
        let sql = "update song set title=? lyrics=? where sid=?";
        let conn = this.getConnection();
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        })
    }

}