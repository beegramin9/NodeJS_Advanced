const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
/* 명령 실행 위치가 기준 */
// 실행을 mvc.js에서 하므로 current dir을 사용해서 ./mysql.json으로 사용한다
let config = JSON.parse(info);

module.exports = {
    /* 모듈 만들 때는 화살표함수 사용 불가 */
    getConnection: function () {
        let conn = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port
        });
        conn.connect(function (error) {
            if (error)
                console.log('mysql connection error :' + err);
        });
        return conn;
    },
    getJoinLists: function (callback) {
        let conn = this.getConnection();
        /* connection 여기서 만들었으니 */
        /* 본문에서는 .connect()랑 .end()를 사용하면 안 된다(중복사용) */

        let sql = `SELECT song.sid, song.title, gg.name, song.lyrics FROM song
        LEFT JOIN girl_group AS gg
        ON song.sid = gg.hit_song_id
        ORDER by song.sid DESC;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getAllLists: function (callback) {
        /* 비동기 방식-callback 짝 */
        let conn = this.getConnection();
        let sql = `SELECT * FROM song ORDER BY sid DESC LIMIT 5;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
            /* 비동기방식 일때 callback(params)는 return params와 같다. */
        });
        conn.end();
    },
    insertSong: function (params, callback) {
        let sql = `insert into song(title, lyrics) values(?, ?);`;
        let conn = this.getConnection();
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteSong: function (sid, callback) {
        let sql = `delete from song where sid=?;`;
        let conn = this.getConnection();
        conn.query(sql, sid, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getSong: function (sid, callback) {
        let sql = `select * from song where sid=?;`;
        let conn = this.getConnection();
        conn.query(sql, sid, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows[0]);
            /* result = function(sid) */
            // getSong 함수를 쓸 때는
            // 내가 sid를 parameter로 주고
            // 그 결과를 callback으로 받겠다
            // callback을 rows[0]로 받으면

            // 실제 mvc.js에서 사용할 때는
            // getSong(sid, result) <-- result는 getSong함수에서 받은 결과 callback(rows[0])
            // 즉 result는 rows[0]가 된다.

        });
        conn.end();
    },
    updateSong: function (params, callback) {
        let sql = `update song set title=?, lyrics=? where sid=?;`;
        let conn = this.getConnection();
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}