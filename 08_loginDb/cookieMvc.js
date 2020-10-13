const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const dm = require('./db/userDb-module');
const { get } = require('http');
const dbModule = require('../06_girlGroup/db/db-module');
const { generateHash } = require('./db/userDb-module');

const aM = require('./view/alertMsg')

/* 쿠키 사용하기 */
const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.cookies);
    if (req.cookies && req.cookies.isLoggedIn) {
        /* 쿠키 이름을 isLoggedin이라고 속성처럼 .찍고 사용가능 */
        /* 아까 res.cookie('isLoggedIn') 으로 쓴 것에서 가져온 것 */

        /* 올바른 로그인 */
        /* 쿠키가 있다면 어디는 갈 수 있음 */
        dm.getAllLists(rows => {
            /* getAllLists 선언 당시에 parameter는 없고 */
            /* callback(리턴)을 rows로 받게 선언했다. */

            /* 사용할 때도 parameter는 없고 바로 콜백 리턴값인 */
            /* rows를 받도록 */
            /* "getAllLists을 쓰면 비동기로 처리가 되고, 일이 끝나면 */
            /* 리턴값인 row를 받아올 거야. */
            /* 그러면 난 이제 전화로 받은 리턴값으로 내가 하고싶은 걸 할게" */

            /* 여기서는 그 rows (DB에서 가져온 [{},{},{}] 형태의 데이터) */
            /* 를 받아서 대문을 완성하는 것 */
            const view = require('./view/cookieList');
            let html = view.mainForm(rows);
            res.send(html);
        })
    } else {
        /* 쿠키가 없다면 로그인 창으로 */
        res.redirect('/login')
    }
})

app.get('/login', (req, res) => {
    const view = require('./view/userLogin');
    let html = view.loginForm();
    res.send(html);
})

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = dm.generateHash(pwd);

    dm.getUserInfo(uid, result => {
        console.log(result);
        if (!result) {
            let html = aM.alertMsg(`Sign in failed, ${uid} to be the wrong uid`, '/login');
            /* Alert창에는 에러가 딱 한 줄로만 있어야 함! */
            /* Template literal에서 엔터쳐도 되잖아. alert창에서는 두 줄로 나눠지면 에러 발생 */
            res.send(html)
            /* 여기에 res.redirect('/')을 넣으면  */
            /* 읽을 때는 html으로 alert창 띄운 다음에 /로 가야할 것 같은데 */
            /* 비동기 처리방식 때문에 한 번에 html과 /로 요청을 동시에 보내서 */
            /* 어딜 가야할지 몰라 오류가 발생한다. */

            /* 그래서 alertForm에 url을 인자로 넣는 것 */
        } else {
            if (result.pwd === pwdHash) {
                res.cookie('isLoggedIn', 1, /* { maxAge: 60 * 1000 }/* 로그인유효기간 * */);
                /* F12 Network에서 쿠키 확인가능 */
                /* Int로 보냈는데 쿠키로 나왔을 땐 String으로 나온다 */

                /* isLoggedIn 값이 있으면 대문으로 */
                /* 없으면 /login 창으로 */

                console.log('Signed in');
                res.redirect('/');
            } else {
                let html = aM.alertMsg(`Sign in failed, wrong password`, '/login');
                res.send(html)
            }
        }
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('isLoggedIn');
    res.redirect('/login')
})



app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});

/* 클라이언트의 쿠키를 이용해서 로그인하는 방법 */
/* 서버의 세션을 이용해서 로그인하는 방법 */