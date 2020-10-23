const express = require('express');
const dm = require('./db/dbModule');
const ut = require('./util/util')
const userDM = require('./db/dbUser')
const aM = require('./view/alertMsg');

let uRouter = express.Router();
module.exports = uRouter;

/* 세션 사용해서 회원가입 했을 때 그거를 req.session.에다가 담아내야함 */

uRouter.get('/register', (req, res) => {
    const view = require('./view/10_userRegister')
    let html = view.userRegister();
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
        userDM.newUser(params, () => {
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

})

uRouter.get('/getUsers/:page', (req, res) => {
    let currentPage = parseInt(req.params.page);
    req.session.currentPage = currentPage;
    let offset = (currentPage - 1) * 10;

    userDM.getTotalNumUsers(result => {
        let NumContent = result.users_count;
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


        userDM.getAllUsersForAdmin(offset, rows => {
            let view = require('./view/07_getAllUsersForAdmin');
            let html = view.getAllUsersForAdmin(req.session.uname, rows, currentPage, startPage, endPage, totalPage, false);
            res.send(html);
        })
    });
    /* 위에거 참고해서 하시길 */
})

uRouter.get('/myPage', (req, res) => {
    userDM.myPageInfo(req.session.uname, result => {
        const view = require('./view/08_myPage')
        let html = view.myPage(req.session.uname, result);
        res.send(html);
    })
})

uRouter.post('/myPage', (req, res) => {
    let uname = req.body.uname
    let tel = req.body.tel
    let email = req.body.email
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;

    if (pwd === pwd2) {
        console.log(pwd, pwd2);
        let pwdHash = ut.generateHash(pwd);
        console.log(pwdHash);
        let pwdParams = [pwdHash, uname];
        console.log(pwdParams);

        userDM.updatePwdUser(pwdParams, () => {
            let params = [uname, tel, email, req.session.uid]
            userDM.updateMyInfo(params, () => {
                let html = aM.alertMsgHistory(`회원정보가 성공적으로 변경되었습니다.`);
                res.send(html);
            })
        })
        /* 아직 안 들어가네 */
    } else {
        let html = aM.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/myPage`); /* 로그인은 됐는데 권한이 없으니 루트로 */
        res.send(html);
    }

})