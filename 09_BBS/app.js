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

const uRouter = require('./userRouter')
app.use('/user', uRouter);

/* app.js에서는 /home, /login, /logout만 처리하고 */
/* userRouter는 사용자 관리 /user/list, /user/reqister, /user/update, /user/delete */
/* bbsRouter는 글,댓글 보는 경로 /bbs/create, /bbs/list, /bbs/view, /bbs/update , /bbs/delete */

app.get('/', (req, res) => {
    fs.readFile('./view/index.html', 'utf8', (error, data) => {
        res.send(data);
    })
    // const view = require('./view/test');
    // let html = view.test();
    // res.send(html);
})

app.listen(3000, () => { console.log('Server Running at http://127.0.0.1:3000') });