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
        let sql = `SELECT * FROM girl_group ORDER BY ggid desc LIMIT 5`
        /* heidiSQL에서는 확인차 * 을 사욜하는 것도 좋지만 */
        /* 내가 필드명을 일일히 나열해줘야지 나중에 */
        /* insert.js ,update.js form에서 name, value를 받을 때 */
        /* 기억하기 쉽다. 왜? 필드명이 100% 똑같아야 하기 때문이다! */
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
        })
    },
    deleteGroup: function (ggid, callback) {
        let sql = `delete from girl_group where ggid=?`
        let conn = this.getConnection();
        conn.query(sql, ggid, (error, fields) => {
            if (error)
                console.log(`deleteGroup 에러 발생: ${error}`);
            callback()
        })
    },
    songToUpdate: function (ggid, callback) {
        let sql = `select * from girl_group where ggid=?`
        let conn = this.getConnection();
        conn.query(sql, ggid, (error, rows, fields) => {
            if (error)
                console.log(`songToUpdate 에러 발생: ${error}`);
            callback(rows[0])
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
    },


}