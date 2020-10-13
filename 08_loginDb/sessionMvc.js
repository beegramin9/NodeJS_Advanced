const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const dm = require('./db/userDb-module');
const { get } = require('http');
const dbModule = require('../06_girlGroup/db/db-module');
const { generateHash } = require('./db/userDb-module');

/* 세션 사용하기 */
const session = require('express-session')
/* 세션은 쿠키를 response로 받는다 */
/* 처리를 미들웨어가 알아서 다 해줍니다. 그래서 나는 response로 세션에서 받을 게 없음*/
/* 즉, session의 모든 함수는 req */

/* 세션을 파일로 관리 */
/* sessions라는 파일에 이상한 놈들이 막 생기지? */
const FileStore = require('session-file-store')(session);


const aM = require('./view/alertMsg')

/* 쿠키 사용하기 */
const cookieParser = require('cookie-parser')
app.use(cookieParser('1q2w3e4r'));
/* 똑같이 쓰면 됩니다. */
app.use(session({
    secret: '1q2w3e4r',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({ logFn: function () { } })
}))


app.get('/', (req, res) => {
    console.log(req.session);
    /* 아까 /login에서 받았던 uin, uname과 같은 정보들이 세션에 저장됨 */
    if (!req.session.uid) {
        res.redirect('/login')
        /* 쿠키가 없다면 로그인 창으로 */
    } else {
        dm.getAllLists(rows => {
            /* 올바른 로그인 */
            /* 쿠키가 있다면 어디는 갈 수 있음 */

            const view = require('./view/sessionList');
            let html = view.mainForm(req.session.uname, rows);
            res.send(html);
        })
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
            /* uid가 DB에 없으면 아예 쿼리가 작동되지 않에서 DB에서 아무것도 안 주겠다 */
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
                req.session.uid = uid;
                req.session.uname = result.uname;

                console.log('Signed in');
                req.session.save(function () {
                    res.redirect('/');
                })

            } else {
                let html = aM.alertMsg(`Sign in failed, wrong password`, '/login');
                res.send(html)
            }
        }
    })
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    /* 세션 없애기 */
    res.redirect('/login')
})



app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});

/* 서버의 세션을 이용해서 로그인하는 방법 */