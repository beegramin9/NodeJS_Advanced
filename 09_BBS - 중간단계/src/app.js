const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const fs = require('fs');

app.use('/bootstrap', express.static(__dirname + '/../node_modules/bootstrap/dist'))
console.log(__dirname);
/* template script 주소에서 /bootstrap으로 시작하는 애들은 */
/* 경로를 바로  /node_modules/bootstrap/dist 로 잡아주겠다.*/
/* template을 보면 /bootstrap/css/bootstrap.min.css 으로 되어있는데 */
/* 이게 사실 /bootstrap과 /css/bootstrap.min.css 사이에 위 static에서의 경로가 끼어들어가는 것 */
app.use('/popper', express.static(__dirname + '/../node_modules/@popperjs/core/dist/umd'))
app.use('/jquery', express.static(__dirname + '/../node_modules/jquery/dist'))
app.use(express.static(__dirname + '/../public'))
/* 순서 지키는 거 중요함. */
/* 제일 나중에 오는 애는(여기서는 아이콘) 위에 bootstrap, popper, jquery를 제외한 애들은 */
/* public에서 하겠다는 뜻임 */


const session = require('express-session')
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
app.use(cookieParser('1q2w3e4r'));
app.use(session({
    secret: '1q2w3e4r',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({ logFn: function () { } })
}))

const uRouter = require('./_userRouter')
app.use('/user', uRouter);
const cRouter = require('./_contentRouter')
app.use('/content', cRouter);
const sRouter = require('./_searchRouter')
app.use('/search', sRouter);
const rRouter = require('./_replyRouter')
app.use('/content/reply', rRouter);


/* app.js에서는 /home, /login, /logout만 처리하고 */
/* userRouter는 사용자 관리 /user/list, /user/reqister, /user/update, /user/delete */
/* bbsRouter는 글,댓글 보는 경로 /bbs/create, /bbs/list, /bbs/view, /bbs/update , /bbs/delete */

const dm = require('./db/dbModule');
const ut = require('./util/util')
const aM = require('./view/alertMsg');
const e = require('express');

app.get('/', (req, res) => {
    res.redirect('/page/1')
})

app.get('/page/:page', function (req, res) {
    let currentPage = parseInt(req.params.page);
    req.session.currentPage = currentPage;
    let offset = (currentPage - 1) * 10;
    console.log('offset', offset);


    dm.getTotalNumContent(result => {
        let NumContent = result.bbs_count;
        let totalPage = Math.ceil(NumContent / 10);

        let startPage;
        let endPage;
        if (currentPage < 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage >= totalPage - 2) {
            startPage = totalPage - 4;
            endPage = totalPage;
        } else {
            startPage = parseInt(currentPage - 2);
            endPage = parseInt(currentPage + 2);
        }
        // let endPage = Math.ceil(currentPage / 10) * 10;
        endPage = (endPage > totalPage) ? totalPage : endPage;


        dm.mainPageGetLists(offset, rows => {
            let view = require('./view/02_mainPage');
            let html = view.mainPage(req.session.uname, rows, currentPage, startPage, endPage, totalPage, false);
            res.send(html);
        })
    });
});

app.get('/login', (req, res) => {
    const view = require('./view/01_loginPage');
    let html = view.loginPage();
    res.send(html);
})

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;

    // console.log('나와라!', uid, pwd);
    let pwdHash = ut.generateHash(pwd);

    dm.getUserInfo(uid, (result) => {
        /* 로그인해서 정보 받는거랑 */
        /* 화면에 뿌려주는거랑 다르게 해야할거같은데 */
        /* 콜백함수를 두번쓰는거지. 콜백지옥? */
        if (!result) {
            let html = aM.alertMsg(`Sign in failed, ${uid} to be the wrong uid`, '/login');

            res.send(html)

        } else {
            if (result.pwd === pwdHash) {
                req.session.uid = uid;
                req.session.uname = result.uname;
                req.session.save(function () {
                    res.redirect('/page/1')
                })
            } else {
                let html = aM.alertMsg(`Sign in failed, wrong password`, '/login');
                res.send(html)
            }
        }
    })
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    /* 세션 없애기 */
    res.redirect('/login')
})

app.listen(3000, () => { console.log('Server Running at http://127.0.0.1:3000') });