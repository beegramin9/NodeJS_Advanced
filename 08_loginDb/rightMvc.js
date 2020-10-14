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

const ut = require('./util/util')

app.get('/', ut.isLoggedIn, (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/rightList');
        let html = view.mainForm(req.session.uname, rows);
        res.send(html);
    })
})

app.get('/delete/:uid', ut.isLoggedIn, (req, res) => {
    if (req.params.uid === req.session.uid) { /* 권한 있음 */
        dm.deleteUser(req.params.uid, () => {
            res.redirect('/');
            /* 이미 /에서 뿌려줄 때는 isDeleted가 0인 애들만 뿌려주니 */
            /* 내가 isDeleted를 1로 바꿔주면 */
            /* 안 뿌려줄테니 루트로만 가면 된다. */
        })
    } else {
        let html = aM.alertMsg(`삭제 권한이 없습니다.`, '/'); /* 로그인은 됐는데 권한이 없으니 루트로 */
        res.send(html);
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
    let pwdHash = ut.generateHash(pwd);

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