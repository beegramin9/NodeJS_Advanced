const express = require('express');
const dm = require('./db/dbModule');
const replyDM = require('./db/dbReply')
const aM = require('./view/alertMsg')
let cRouter = express.Router();
module.exports = cRouter;

/* 세션 사용해서 회원가입 했을 때 그거를 req.session.에다가 담아내야함 */
/* 이건 회원가입 할 때나 그런거야 */
/* bid를 정의해줘야 함. 세션으로 */

cRouter.get('/bid/:bid', (req, res) => {
    let bid = req.params.bid;
    dm.getContent(bid, result => {
        dm.increaseViewCount(bid, () => {
            req.session.contentUname = result.users_uname
            replyDM.getWholeComment(bid, wholeComments => {


                const view = require('./view/03_contentPage')
                let html = view.contentPage(req.session.uname, result, wholeComments);
                res.send(html);
            })
        })
    })
})

cRouter.get('/create', (req, res) => {
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
    console.log(req.session.uname);

    dm.contentToUpdate(bid, result => {
        if (req.session.uname === req.session.contentUname) {
            const view = require('./view/05_updateContentPage')
            let html = view.updateContentPage(req.session.uname, result);
            res.send(html);
        } else {
            let html = aM.alertMsg(`수정 권한이 없습니다.`, `/content/bid/${bid}`); /* 로그인은 됐는데 권한이 없으니 루트로 */
            res.send(html);
        }
    })
})

//       if (req.params.uid === req.session.uid) { /* 권한 있음 */
//           dm.getUserInfo(req.params.uid, (result) => {
//               const view = require('./view/usePwdUpdate')
//               let html = view.updatePwdForm(result);
//               res.send(html);
//           })
//       } else {
//           let html = aM.alertMsg(`수정 권한이 없습니다.`, '/'); /* 로그인은 됐는데 권한이 없으니 루트로 */
//           res.send(html);
//       }

cRouter.post('/bid/:bid/update', (req, res) => {
    let title = req.body.title
    let content = req.body.content
    let bid = parseInt(req.body.bid)
    let params = [title, content, bid]

    /* 여기서 result.users_name을 가져와야 한다. */


    dm.updateContent(params, () => {
        res.redirect('/')
    })
})

cRouter.get('/bid/:bid/delete', (req, res) => {
    /* 삭제하기! */
    console.log(req.session.uname);
    console.log(req.session.contentUname)
    let bid = parseInt(req.params.bid)
    if (req.session.uname === req.session.contentUname) {
        const view = require('./view/06_deleteContentPage')
        let html = view.deleteContentPage(req.session.uname, bid);
        res.send(html);
    } else {
        let html = aM.alertMsg(`삭제 권한이 없습니다.`, `/content/bid/${bid}`); /* 로그인은 됐는데 권한이 없으니 루트로 */
        res.send(html);
    }
})

cRouter.post('/bid/:bid/delete', (req, res) => {
    /* 삭제하기! */
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

    // console.log(req.session.replyUname);
    /* 여기에서 폼으로 받아와야지 */

    let comments = req.body.comments;
    let isMine = '';
    if (req.session.uname === req.session.contentUname) {
        isMine = 0
    } else {
        isMine = 1
    }

    let params = [bid, req.session.uid, comments, isMine]

    replyDM.increaseReplyCount(bid, () => {
        replyDM.createMyComment(params, () => {

            res.redirect(`/content/bid/${bid}`)
        })
    })
})

cRouter.post('/reply/delete', (req, res) => {
    // 여기서도 권한 줘야함
    console.log('접속자:', req.session.uname);
    // console.log('글주인:', req.session.contentUname);

    let replyUsername = req.body.uname
    console.log('리플주인:', replyUsername);


    /* 댓글의 사용자를 가져와야함 */

    /* replyname이 필요하다 */
    let rid = parseInt(req.body.rid);
    let bid = parseInt(req.body.bid);
    // console.log('안나오냐', rid, bid);
    // req.session.uid
    if (req.session.uname === replyUsername) {
        replyDM.decreaseReplyCount(bid, () => {
            replyDM.deleteMyComment(rid, () => {
                res.redirect(`/content/bid/${bid}`)
            })
        })
    } else {
        let html = aM.alertMsg(`삭제 권한이 없습니다.`, `/content/bid/${bid}`); /* 로그인은 됐는데 권한이 없으니 루트로 */
        res.send(html);
    }
})


