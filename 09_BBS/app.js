const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')
const FileStore = require('session-file-store')(session);
app.use(bodyParser.urlencoded({ extended: false }));
const fs = require('fs');
const cookieParser = require('cookie-parser');
app.use(cookieParser('1q2w3e4r'));
app.use(session({
    secret: '1q2w3e4r',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({ logFn: function () { } })
}))

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
/* template script 주소에서 /bootstrap으로 시작하는 애들은 */
/* 경로를 바로  /node_modules/bootstrap/dist 로 잡아주겠다.*/
/* template을 보면 /bootstrap/css/bootstrap.min.css 으로 되어있는데 */
/* 이게 사실 /bootstrap과 /css/bootstrap.min.css 사이에 위 static에서의 경로가 끼어들어가는 것 */
app.use('/popper', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use(express.static(__dirname + '/public'))
/* 순서 지키는 거 중요함. */
/* 제일 나중에 오는 애는(여기서는 아이콘) 위에 bootstrap, popper, jquery를 제외한 애들은 */
/* public에서 하겠다는 뜻임 */

const uRouter = require('./_userRouter')
app.use('/user', uRouter);
const cRouter = require('./_contentRouter')
app.use('/content', cRouter);


/* app.js에서는 /home, /login, /logout만 처리하고 */
/* userRouter는 사용자 관리 /user/list, /user/reqister, /user/update, /user/delete */
/* bbsRouter는 글,댓글 보는 경로 /bbs/create, /bbs/list, /bbs/view, /bbs/update , /bbs/delete */

const dm = require('./db/dbModule');
const ut = require('./util/util')
const aM = require('./view/alertMsg')

app.get('/', /* ut.isLoggedIn, */(req, res) => {
    dm.mainPageGetLists(rows => {
        /* 페이지를 두개로 나눠야 돼...? */
        const view = require('./view/02_mainPage');
        let html = view.mainPage(rows);
        res.send(html);
    })
})

app.get('/signup', (req, res) => {
    const view = require('./view/uRegister')
    let html = view.signUpPage();
    res.send(html);
})

app.get('/login', (req, res) => {
    const view = require('./view/01_loginPage');
    let html = view.loginPage();
    res.send(html);
})

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    console.log('나와라!', uid, pwd);
    let pwdHash = ut.generateHash(pwd);

    dm.getUserInfo(uid, (result) => {
        /* 로그인해서 정보 받는거랑 */
        /* 화면에 뿌려주는거랑 다르게 해야할거같은데 */
        /* 콜백함수를 두번쓰는거지. 콜백지옥? */
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
                // req.session.uid = uid;
                // req.session.uname = result.uname;
                console.log('Signed in');

                let uname = result.uname
                dm.mainPageGetLists(rows => {
                    const view = require('./view/02_afterLoginMainPage');
                    console.log(rows)
                    let html = view.afterLoginMainPage(uname, rows);
                    res.send(html);
                })
                // req.session.save(function () {
                // })

            } else {
                console.log(pwdHash, result.pwd);
                let html = aM.alertMsg(`Sign in failed, wrong password`, '/login');
                res.send(html)
            }
        }




        /* 아니면 로그인으로 할 수 있나...? */
        /* 왜냐면 여기서 rows가 나와야하긴해 */
    })
})


/* 이제 세션으로 해서! 로그인 된 정보를 캐리할 수 있게 해줘야 함 */
/* 회원가입 비밀번호 해시 */

app.listen(3000, () => { console.log('Server Running at http://127.0.0.1:3000') });