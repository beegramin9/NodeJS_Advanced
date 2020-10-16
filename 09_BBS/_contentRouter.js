const express = require('express');
const dm = require('./db/dbModule');
let cRouter = express.Router();
module.exports = cRouter;

/* 세션 사용해서 회원가입 했을 때 그거를 req.session.에다가 담아내야함 */
/* 이건 회원가입 할 때나 그런거야 */
/* bid를 정의해줘야 함. 세션으로 */

cRouter.get('/bid/:bid', (req, res) => {
    let bid = req.params.bid;

    dm.getContent(bid, result => {
        req.session.uname = result.users_uname;
        /* 이렇게 써주면 회원가입할 때 정보가 계속 들어오지 */

        const view = require('./view/03_contentPage')
        let html = view.contentPage(req.session.uname, result);
        res.send(html);
    })
})

/* */

/* 삭제는 글 안에 들어가서 할 수 있도록 */
cRouter.get('/create', (req, res) => {
    /* db모듈에 새로운 내용들을 집어넣는 insert 구문이 있어야 함 */
    /* 그리고 createpage가 있어야 함 */
    /*  */
    /* 세션 유네임이 안들어와서 그래 */
    // req.session.uname
    /* 로그인했을때 받은 세션이 어떻게 되어있지? */


    const view = require('./view/04_createContentPage')
    let html = view.createContentPage(req.session.uname);
    res.send(html);
})

cRouter.post('/create', (req, res) => {
    /* form으로 받아야겠네... */
    /* form으로 받아서 새로운 bid를 가진 getContent로 쏴주면 되겠군 */
    let title = req.body.title
    let content = req.body.content
    /* bid 1 늘어나는 걸 어떻게 해야하지 */
    /* 하이디에서는 바로 됐는데... */
    let params = [req.session.uid, title, content]
    console.log(params);

    dm.makeNewContent(params, (result_bid) => {
        let bid = result_bid
        console.log('makeNewContent', bid);

        /* bid가 undefined니까 아예 안나오는거야 */
        dm.getContent(bid, result => {
            req.session.uname = result.users_uname;
            /* 얘도 정의가 안되어있음 */
            console.log(req.session.uname);
            /* 이렇게 써주면 회원가입할 때 정보가 계속 들어오지 */
            /* 여기 화면이 제대로 안 되어있어서 오류가 나는거야. 트랜잭션처럼 한 곳에서 오류나면 */
            /* 딴 데서 아예 안 나오게 하는거지  */
            const view = require('./view/03_contentPage')
            let html = view.contentPage(req.session.uname, result);
            res.send(html);
        })
    })
})



// app.get('/create', (req, res) => {
//     fs.readdir("data", (e, filelist) => {
//         let list = template.listGen(filelist);
//         let control = template.buttonGen()
//         let content = template.createForm()
//         let html = view.index('글 생성', list, content, control);
//         res.send(html);
//     });
// })



/* 이제 여기서 수정, 삭제, create를 해줘야하는데*/

/* 글목록에서 create, 삭제가능하게 */
/* 실제로 글을 들어가서 수정 */


/* 콘텐츠. 즉 글 들어갔을 때 */