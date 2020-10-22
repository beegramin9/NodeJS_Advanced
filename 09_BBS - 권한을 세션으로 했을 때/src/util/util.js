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

        let leftPage = (currentPage > 1) ? `/page/${currentPage - 1}` : '#';
        let pages = `
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link active text-body" href="${leftPage}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span></a>
                    </li>`;
        for (let page = startPage; page <= endPage; page++) {
            if (page === currentPage)
                pages += `<li class="page-item">
                            <a class="page-link text-body bg-secondary" href="#">
                            ${page}
                            </a>
                    </li>`;
            else
                pages += `<li class="page-item">
                        <a class="page-link text-body" href="/page/${page}">
                          ${page}
                        </a>
                      </li>`;
        }
        let rightPage = (endPage < totalPage) ? `/page/${currentPage + 1}` : '#';
        pages += `  <li class="page-item">
                    <a class="page-link text-body" href="${rightPage}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>`;
        return pages

    },
    viewAdminUsersPage: function (currentPage, startPage, endPage, totalPage, isSearch) {

        let leftPage = (currentPage > 1) ? `/user/getUsers/${currentPage - 1}` : '#';
        let pages = `
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link active text-body" href="${leftPage}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span></a>
                    </li>`;
        for (let page = startPage; page <= endPage; page++) {
            if (page === currentPage)
                pages += `<li class="page-item">
                            <a class="page-link bg-secondary text-body" href="#">
                            ${page}
                            </a>
                    </li>`;
            else
                pages += `<li class="page-item">
                        <a class="page-link text-body" href="/user/getUsers/${page}">
                          ${page}
                        </a>
                      </li>`;
        }
        let rightPage = (endPage < totalPage) ? `/user/getUsers/${currentPage + 1}` : '#';
        pages += `  <li class="page-item">
                    <a class="page-link text-body" href="${rightPage}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>`;
        return pages

    },
    searchResult: function (searchKeyword, currentPage, startPage, endPage, totalPage, isSearch) {

        let leftPage = (currentPage > 1) ? `/search/${searchKeyword}/${currentPage - 1}` : '#';
        let pages = `
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link active text-body" href="${leftPage}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span></a>
                    </li>`;
        for (let page = startPage; page <= endPage; page++) {
            if (page === currentPage)
                pages += `<li class="page-item">
                            <a class="page-link text-body bg-secondary" href="#">
                            ${page}
                            </a>
                    </li>`;
            else
                pages += `<li class="page-item">
                        <a class="page-link text-body" href="/search/${searchKeyword}/${page}">
                          ${page}
                        </a>
                      </li>`;
        }
        let rightPage = (endPage < totalPage) ? `/search/${searchKeyword}/${currentPage + 1}` : '#';
        pages += `  <li class="page-item">
                    <a class="page-link text-body" href="${rightPage}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>`;
        return pages

    }
}