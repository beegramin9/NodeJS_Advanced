const express = require('express');
let uRouter = express.Router();

/* 세션 사용해서 회원가입 했을 때 그거를 req.session.에다가 담아내야함 */


uRouter.get('/register', (req, res) => {
    const view = require('./view/uRegister')
    let html = view.uRegister();
    res.send(html);

})

uRouter.post('/register', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    res.send(`<h1>${uid},${pwd},${pwd2},${uname}</h1>`)
})

module.exports = uRouter;

/* 콘텐츠. 즉 글 들어갔을 때 */