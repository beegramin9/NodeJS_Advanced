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
        let sql = `SELECT ggid,NAME,debut,hit_song_Id FROM girl_group ORDER BY ggid desc LIMIT 5`
        /* heidiSQL에서는 확인차 * 을 사욜하는 것도 좋지만 */
        /* 내가 필드명을 일일히 나열해줘야지 나중에 */
        /* insert.js ,update.js form에서 name, value를 받을 때 */
        /* 기억하기 쉽다. 왜? 필드명과 name, value 값이 100% 똑같아야 하기 때문이다! */
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(`getAllLists 에러 발생: ${error}`);
            callback(rows);
        })
    },
    insertGroup: function (params, callback) {
        let sql = `insert into girl_group(NAME, debut, hit_song_Id)
        values(?,?,?)`
        let conn = this.getConnection()
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`insertGroup 에러 발생: ${error}`);
            callback()
            /* callback 했을 때 return 받을 게 없다 */
            /* 왜? Post /insert에서 추가된 값을 보여주는 게 아니라 */
            /* 어짜피 redirection('/')이 되어서 */
            /* 처음 대문 함수, 즉 view.mainForm(rows)에서 */
            /* 새로 추가된 행을 받아서 뿌려주기 때문이다. */
        })
    },
    deleteGroup: function (ggid, callback) {
        let sql = `delete from girl_group where ggid=?`
        let conn = this.getConnection();
        conn.query(sql, ggid, (error, fields) => {
            /* 위 sql문에 ?가 있으니 */
            /* 여기서는 ggid 자체가 하나로 된 parameter인 것 */
            if (error)
                console.log(`deleteGroup 에러 발생: ${error}`);
            callback()
            /* 여기서도 callback 했을 때 받을 게 없다 */
            /* 어짜피 redirection('/')으로 대문으로 돌아가고 */
            /* 대문에서 다시 db를 읽어서 화면에 뿌리기 때문이다. */
        })
    },
    songToUpdate: function (ggid, callback) {
        let sql = `select ggid,NAME,debut,hit_song_Id from girl_group where ggid=?`
        let conn = this.getConnection();
        conn.query(sql, ggid, (error, rows, fields) => {
            if (error)
                console.log(`songToUpdate 에러 발생: ${error}`);
            callback(rows[0])
            /* redirection('/')해서 대문으로 가는 게 아니기 때문에 */
            /* callback으로 리턴값을 받아야 한다. */
            console.log(row);
            /* row가 어떻게 생겼는지 조심 */
            /* DB에서 쿼리의 리턴값을 받을 때는 */
            /* 다시 말해 rows를 받을 때는 */
            /* 이게 한 줄이든, 여러 줄이든(여러 줄이면 list페이지 mainForm에서) */
            /* 반복문에서 row=객체 하나씩 뽑아서 row.key값을 뽑아내듯이 */
            /* [ {} , {}, {} ] 형태로 되어있다. */
        })
    },

    updateGroup: function (params, callback) {
        let sql = `update girl_group set NAME=?, debut=?, hit_song_Id=? where ggid=?  `
        let conn = this.getConnection();
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`updateGroup 에러 발생: ${error}`);
            callback(params)
        })
    }

}