const express = require('express');
const dm = require('./db/dbModule');
const ut = require('./util/util')

let uRouter = express.Router();
module.exports = uRouter;

/* 세션 사용해서 회원가입 했을 때 그거를 req.session.에다가 담아내야함 */

uRouter.get('/register', (req, res) => {
    const view = require('./view/uRegister')
    let html = view.uRegister();
    res.send(html);

})

uRouter.post('/register', (req, res) => {
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;

    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwdHash, uname, tel, email]
        dm.newUser(params, () => {
            /* 여기에서 uname을 받아서 화면에 뿌리려면.. */
            /* 로그인 페이지로 돌아가야지 */
            /* 그래서 그 아이디로 로그인하면 */
            /* 화면에 뿌려주게할수있지 */

            /* 붓스트랩에서 alert랑 비슷한거 있었지? */
            /* "회원가입이 완료되었습니다!"  이렇게 띄우면 되지*/
            res.redirect('/login')
        })


    } else {
        let html = aM.alertMsg(`패스워드가 일치하지 않습니다.`, `/login`); /* 로그인은 됐는데 권한이 없으니 루트로 */
        res.send(html);
    }


    /* 해시 빠짐 */

    /* 로그인/ 아이디를 신경써줘야 하는데... */
    /* 데이터베이스에 넣어야 되네... */
})
