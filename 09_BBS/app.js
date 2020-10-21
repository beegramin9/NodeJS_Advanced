const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const fs = require('fs');

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


/* app.js에서는 /home, /login, /logout만 처리하고 */
/* userRouter는 사용자 관리 /user/list, /user/reqister, /user/update, /user/delete */
/* bbsRouter는 글,댓글 보는 경로 /bbs/create, /bbs/list, /bbs/view, /bbs/update , /bbs/delete */

const dm = require('./db/dbModule');
const ut = require('./util/util')
const aM = require('./view/alertMsg');
const dbPagination = require('./db/dbPagination');

app.get('/', /* ut.isLoggedIn, */(req, res) => {
    /* 로그인 안해도 볼 수 있게 하려면 */
    /* 내가 만든 삼항연산자 + 함수 기본값으로 지랄을 해야 가능 */
    /* ㅋㅋㅋㅋ 머리 깨지는줄 */

    /* 지금 여기부터 쿠키가 들어가서 로그인으로 패싱이 안 되어있음 */
    /* 로그아웃을 하고, 세션디스트로이가 안 들어가서 그렇다. */
    dm.mainPageGetLists(rows => {
        /* 페이지를 두개로 나눠야 돼...? */
        /* 삼항연산자 아니면 함수 파라미터 줄 떄 파이썬처럼 디폴트값이 있나 */
        const view = require('./view/02_mainPage');
        let html = view.mainPage(req.session.uname, rows);
        /* 함수 기본값 매개변수로 하자 */
        res.send(html);
    })
})

app.get('/page/:page', function (req, res) {
    let page = parseInt(req.params.page);
    req.session.currentPage = page;
    let offset = (page - 1) * 10;
    // dm.getTotalNumContent(result => {
    // let totalPage = Math.ceil(result.count / 10);
    // let startPage = Math.floor((page - 1) / 10) * 10 + 1;
    // let endPage = Math.ceil(page / 10) * 10;
    // endPage = (endPage > totalPage) ? totalPage : endPage;

    dm.getTotalNumContent(offset, rows => {
        let view = require('./view/02_mainPage');
        let html = view.mainPage(req.session.uname, rows/* , page, startPage, endPage, totalPage */);
        res.send(html);
    })
    // });
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
                req.session.save(function () {
                    res.redirect('/')
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

app.post('/search', (req, res) => {
    let searchKeyword = req.body.search
    /* 물음표가 2개가 있으니까 어레이로 묶어서 넣어주면 됨 */
    /* db에서 %?%로 하면 오류가 난다.*/
    dm.searchKeywordGetLists(`%${searchKeyword}%`, rows => {
        /* 페이지를 두개로 나눠야 돼...? */
        /* 삼항연산자 아니면 함수 파라미터 줄 떄 파이썬처럼 디폴트값이 있나 */
        if (rows.length === 0) {
            let html = aM.alertMsg(`해당 검색어가 없습니다. 메인 페이지로 돌아가시겠습니까? `, '/');
            res.send(html)
        } else if (!searchKeyword) {
            let html = aM.alertMsg(`검색어를 입력하세요. `, '/');
            res.send(html)
        } else {
            console.log(rows);
            const view = require('./view/02_mainPage');
            let html = view.mainPage(req.session.uname, rows);
            res.send(html);
        }
    })
})



app.listen(3000, () => { console.log('Server Running at http://127.0.0.1:3000') });