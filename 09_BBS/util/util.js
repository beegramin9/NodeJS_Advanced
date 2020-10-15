module.exports = {
    generateHash: function (sth) {
        const crypto = require('crypto')
        const shasum = crypto.createHash('sha256')
        shasum.update(sth)
        return shasum.digest('base64')
    },
    isLoggedIn: function (req, res, next) {
        if (!req.session.uid) {
            res.redirect('/login')
            /* 쿠키가 없다면 로그인 창으로 */
        } else {
            next();
            /* app.get이나 app.post 와 같이 app에 req,res가 들어와서*/
            /* 중간을 미들웨어들로 처리할 때 */
            /* next()를 쓰면 그냥 다음 미들웨어로 패스한다는 뜻 */
            /* 다음 미들웨어에서 새로운 (req,res)를 처리 */
        }
    }
}