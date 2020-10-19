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
        replyDM.getMyComment(bid, myReplies => {
            replyDM.getOthersComment(bid, othersReplies => {
                const view = require('./view/03_contentPage')
                let html = view.contentPage(req.session.uname, result, othersReplies, myReplies);
                res.send(html);
            })
        })
    })
})


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
    let title = req.body.title
    let content = req.body.content
    let params = [req.session.uid, title, content]

    dm.createContent(params, () => {
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


cRouter.post('/reply/create', (req, res) => {
    /* 화면은 띄우지 않고 데이터 받을 것만 받은 이후에 */
    /* res.resdirect('/bid/${bid}')로 가면 됨 */
    /* db reply에 집어 넣는거랑, 댓글 개수 올라갈 때? 두개?? */
    let bid = req.body.bid;
    req.session.bid = bid

    let comments = req.body.comments;
    let params = [bid, req.session.uid, comments]
    replyDM.createMyComment(params, (ㅉ) => {
        res.redirect(`/content/bid/${bid}`)
    })
})

cRouter.post('/reply/delete', (req, res) => {
    let rid = parseInt(req.body.rid);
    let bid = parseInt(req.body.bid);
    console.log('안나오냐', rid, bid);
    // req.session.uid
    replyDM.deleteMyComment(rid, () => {
        res.redirect(`/content/bid/${bid}`)
    })
})

