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
        const view = require('./view/03_contentPage')
        let html = view.contentPage(result);
        res.send(html);
    })
})

/* bid가왜 안 찾아지지? */
/* 앵커를 아직 안 만들어서 그래 */




/* 콘텐츠. 즉 글 들어갔을 때 */