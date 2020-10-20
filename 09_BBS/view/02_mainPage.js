const template = require('./00_template');
const writeAlert = require('./writeAlert');
/* ${writeAlert.writeAlert('로그인이 필요합니다', '/')}
    이렇게 쓰면 메인페이지가 안뜨고 그냥 바로 경고창이 떠버림
    어케하지?
    
 */
exports.mainPage = function (rows, uname) {

    // let today = new Date();
    // let whatToday = today.getTime()
    // console.log(new Date(whatToday))
    // 시간 맞추는 건 나중에
    // row.bbs_modTime
    let tableRow = '';
    for (let row of rows) {
        tableRow += `
                    <tr>
                        <td style="padding-right:20px;">${row.bbs_bid}</td>
                        <td style="padding-right:20px;">
                            <a href="/content/bid/${row.bbs_bid}">${row.bbs_title}
                            ${row.bbs_replyCount}
                        </td>
                        <td style="padding-right:20px;">${row.users_uid}</td>
                        <td style="padding-right:20px;">${row.bbs_modTime}</td>
                        <td style="padding-right:20px;">${row.bbs_viewCount}</td>
                    </tr>
        
        `
    }
    /* 로그인 안 된 상태에서 누르면 로그인페이지로 갈 수 있도록 */
    /* 경고창 띄우면서; */
    // ${template.afterLogin(uname)}

    // if (uname !=='일반 사용자')
    /* 로그인이 되면 ...로그인 안 나오게 해야 하는데... */

    /* 이거 밑에 어떻게 해야함 */
    /*  <p>${uname}님 환영합니다. &nbsp;&nbsp; <a href="/logout">로그아웃</a></p>
            ${uname === '일반 사용자' ? ' <p><a href="/login">로그인</a></p>' : ''} */

    /* 글 쓰기 버튼 누를 수 있도록... */
    if (!uname)
        return `
        ${template.header()}
        ${template.headNavBar(uname)}
        <div class="container">
            <p>글을 쓰려면 로그인이 필요합니다.</p>
            <hr>
            <table>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>날짜</th>
                    <th>조회수</th>
                </tr>
                ${tableRow}
               
            </table>
        </div>
        ${template.footNavBar()}
        ${template.footer()}
    `
    else
        return `
        ${template.header()}
        ${template.headNavBar(uname)}
        <div class="container">
            <p><a href="/content/create">글 쓰기</a></p>
            <hr>
            <table>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>날짜</th>
                    <th>조회수</th>
                </tr>
                ${tableRow}
               
            </table>
        </div>

        ${template.footNavBar()}
        ${template.footer()}
        `
}