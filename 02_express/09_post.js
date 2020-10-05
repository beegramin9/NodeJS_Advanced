/* static과 app.post()을 제일 많이 사용한다. */
const express = require('express');
const morgan = require('morgan');
const app = express();

/* 제일 먼저 화면에 09_loginForm.html을 뿌려주는 코드 만들기 */
/* 파일을 먼저 읽어야겠지? */
const fs = require('fs');


app.get('/', (req, res) => {
    res.send('3초 후 로그인 페이지로 이동합니다.');
    setTimeout(() => {
        res.redirect([200], '/login')
    }, 3000)

})


app.get('/login', (req, res) => {
    fs.readFile('09_loginForm.html', 'utf8', (e, data) => {
        res.send(data);
    });
});
// get방식으로 /login에 들어오면?


// 데이터 parse해서 받아와야지
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


app.post('/login', (req, res) => {
    /* body-parser모듈을 익스포트해야지만 아래 형식을 사용 가능 */
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    if (uid === 'park' && pwd === "1234") {
        res.send(`<h1>UID: ${uid} , PWD: ${pwd}<br>login Success</h1>`);
    } else {
        res.redirect('/login')
    }
});



app.listen(3000, () => console.log('Server running at http//localhost:3000'));