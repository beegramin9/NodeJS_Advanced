/* static과 app.post()을 제일 많이 사용한다. */
const express = require('express');
const morgan = require('morgan');
const app = express();

/* 제일 먼저 화면에 09_loginForm.html을 뿌려주는 코드 만들기 */
/* 파일을 먼저 읽어야겠지? */
const fs = require('fs');


const mysql = require('mysql');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info)

let conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});


// const list = require('./views/list')
const template = require('./views/templateSong');

app.get('/', (req, res) => {
    let sql = "SELECT * FROM song ORDER by sid DESC LIMIT 5";
    conn.query(sql, (error, rows, fields) => {
        if (error)
            console.log(error);

        let content = '';
        console.log(content)
        for (let row of rows) {
            content += `<tr>
            <td>${row.sid}</td>
            <td>${row.title}</td>
            <td>${row.lyrics}</td>
            </tr>
            `
        }
        let index = template.mainForm(content);
        res.send(index);
    });
})


app.get('/insert', (req, res) => {
    fs.readFile('./views/songForm.html', 'utf8', (e, data) => {
        res.send(data);
    });
});
// get방식으로 /login에 들어오면?

// 데이터 parse해서 받아와야지
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


app.post('/insert', (req, res) => {
    /* body-parser모듈을 익스포트해야지만 아래 형식을 사용 가능 */
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let sql = `insert into song (title,lyrics)
    values (?,?)`;

    let params = [title, lyrics];
    // conn.connect();

    conn.query(sql, params, (error, fields) => {
        if (error)
            console.log(error);
        res.redirect('/');
    });
    // conn.end();
})



app.listen(3000, () => console.log('Server running at http//localhost:3000'));