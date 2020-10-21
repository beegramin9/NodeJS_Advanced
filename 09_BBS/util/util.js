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
    },
    // pagiNation: function (currentPage, totalPage) {
    //     if (currentPage < 3) {
    //         let startPage = 1; let endPage = 5
    //         return startPage, endPage
    //     } else if (currentPage >= totalPage - 2) {
    //         let startPage = totalPage - 4; let endPage = totalPage;
    //         return startPage, endPage
    //     } else {
    //         let startPage = parseInt(currentPage - 2); let endPage = parseInt(currentPage + 2);
    //         return startPage, endPage
    //     }
    // },
    viewPage: function (currentPage, startPage, endPage, totalPage, isSearch) {
        if (!isSearch) {
            let leftPage = (currentPage > 1) ? `/page/${currentPage - 1}` : '#';
            console.log('startPage', startPage);
            console.log('currentPage', currentPage);
            console.log('leftPage', leftPage);
            let pages = `
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link active" href="${leftPage}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span></a>
                    </li>`;
            for (let page = startPage; page <= endPage; page++) {
                if (page === currentPage)
                    pages += `<li class="page-item active">
                            <a class="page-link" href="#">
                            ${page}
                            </a>
                    </li>`;
                else
                    pages += `<li class="page-item">
                        <a class="page-link" href="/page/${page}">
                          ${page}
                        </a>
                      </li>`;
            }
            let rightPage = (endPage < totalPage) ? `/page/${currentPage + 1}` : '#';
            console.log('rightPage', rightPage);
            console.log('endPage', endPage);
            console.log('totalPage', totalPage);
            pages += `  <li class="page-item">
                    <a class="page-link" href="${rightPage}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>`;
            return pages
        } else {
            let leftPage = (currentPage > 1) ? `/page/search/${currentPage - 1}` : '#';
            console.log('startPage', startPage);
            console.log('currentPage', currentPage);
            console.log('leftPage', leftPage);
            let pages = `
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link active" href="${leftPage}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span></a>
                    </li>`;
            for (let page = startPage; page <= endPage; page++) {
                if (page === currentPage)
                    pages += `<li class="page-item active">
                            <a class="page-link" href="#">
                            ${page}
                            </a>
                    </li>`;
                else
                    pages += `<li class="page-item">
                        <a class="page-link" href="/page/search/${page}">
                          ${page}
                        </a>
                      </li>`;
            }
            let rightPage = (endPage < totalPage) ? `/page/search/${currentPage + 1}` : '#';
            console.log('rightPage', rightPage);
            console.log('endPage', endPage);
            console.log('totalPage', totalPage);
            pages += `  <li class="page-item">
                    <a class="page-link" href="${rightPage}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>`;
            return pages

        }

    }
}