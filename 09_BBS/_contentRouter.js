const express = require('express');
const dm = require('./db/dbModule');
const replyDM = require('./db/dbReply')
let cRouter = express.Router();
module.exports = cRouter;

/* 세션 사용해서 회원가입 했을 때 그거를 req.session.에다가 담아내야함 */
/* 이건 회원가입 할 때나 그런거야 */
/* bid를 정의해줘야 함. 세션으로 */

cRouter.get('/bid/:bid', (req, res) => {
    let bid = req.params.bid;
    console.log(bid);
    dm.getContent(bid, result => {
        replyDM.getMyComment(bid, othersReplies => {
            replyDM.getOthersComment(bid, myReplies => {
                const view = require('./view/03_contentPage')
                let html = view.contentPage(req.session.uname, result, othersReplies, myReplies);
                res.send(html);
            })
        })
    })
})

cRouter.post('/reply', (req, res) => {
    /* 화면은 띄우지 않고 데이터 받을 것만 받은 이후에 */
    /* res.resdirect('/bid/${bid}')로 가면 됨 */
    /* db reply에 집어 넣는거랑, 댓글 개수 올라갈 때? 두개?? */
    let bid = req.body.bid;
    // req.session.uid
    let comments = req.body.comments;
    let params = [bid, req.session.uid, comments]
    console.log(params);
    replyDM.createMyComment(params, () => {
        res.redirect(`/content/bid/${bid}`)
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
    /* 타이틀이... */
    /* db함수에 insert가 잘못되어서 잘못들어가는건지 */
    /* 잘 들어간다! */
    let title = req.body.title
    let content = req.body.content
    let params = [req.session.uid, title, content]

    // let uname = req.body.uname
    // console.log('유저네임 안들어옴', uname);
    /* uname이 안나와서 그래? */

    dm.createContent(params, () => {
        // let bid = result_bid
        // console.log('bid값나오냐', bid);

        /* bid가 undefined니까 아예 안나오는거야 */
        // dm.getBid(result_bid => {
        //     let bid = result_bid.bid
        //     console.log(bid);
        //     dm.getContent(bid, result => {
        //         // result 이것도 안 건너옴.
        //         console.log('안나오나', result);

        //         /* uname을 세션에서 받는게 아니라 hidden 폼에서 받는거야 */

        //         /* 얘도 정의가 안되어있음 */
        //         console.log(uname);
        //         /* 이렇게 써주면 회원가입할 때 정보가 계속 들어오지 */
        //         /* 여기 화면이 제대로 안 되어있어서 오류가 나는거야. 트랜잭션처럼 한 곳에서 오류나면 */
        //         /* 딴 데서 아예 안 나오게 하는거지  */
        //         const view = require('./view/03_contentPage')
        //         let html = view.contentPage(uname, result);
        //         res.send(html);
        //         // res.redirect(`/content/bid/${bid}`)
        //     })
        // })

        res.redirect('/')
    })
})

/* 좋아 여기까지 잘 들어왔어! */
cRouter.get('/bid/:bid/update', (req, res) => {
    let bid = parseInt(req.params.bid)
    dm.contentToUpdate(bid, result => {
        const view = require('./view/05_updateContentPage')
        let html = view.updateContentPage(req.session.uname, result);
        res.send(html);
    })
})

/* 이제 포스트만 하면 돼 */

/* 여기까진 되는데... 그 뭐냐 제목이 수정이 안됨 */
/* 데이터베이스를...흠 */

/* 글 번호가 안 맞는데? */
cRouter.post('/bid/:bid/update', (req, res) => {
    let title = req.body.title
    let content = req.body.content
    let bid = parseInt(req.body.bid)
    let params = [title, content, bid]
    /* 타이틀이... */
    /* db함수에 insert가 잘못되어서 잘못들어가는건지 */
    /* 잘 들어간다! */
    console.log(params);
    dm.updateContent(params, () => {
        res.redirect('/')
    })
})

cRouter.get('/bid/:bid/delete', (req, res) => {
    /* 수정하기! */
    let bid = parseInt(req.params.bid)
    const view = require('./view/06_deleteContentPage')
    let html = view.deleteContentPage(req.session.uname, bid);
    res.send(html);
})

cRouter.post('/bid/:bid/delete', (req, res) => {
    /* 수정하기! */
    let bid = parseInt(req.body.bid)
    console.log(bid);
    dm.deleteContent(bid, () => {
        res.redirect('/')
    })
})



/* 리플 쓰기 */
/* 리플 수정 어케 하지 */
/* 리플 삭제 */

/* 그 전에 화면을 좀 바꿔야 쓰곘다..그래야 보이지 */