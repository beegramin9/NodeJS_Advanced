const template = require('./00_template');

exports.mainPage = function (uname, rows) {

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
                            ${row.reply_NumComments}
                        </td>
                        <td style="padding-right:20px;">${row.users_uid}</td>
                        <td style="padding-right:20px;">${row.bbs_modTime}</td>
                        <td style="padding-right:20px;">${row.bbs_viewCount}</td>
                    </tr>
        
        `
    }
    return `
        ${template.header()}
        ${template.headNavBar()}
            <h3>사용자 조회</h3>
            <p>${uname}님 환영합니다. &nbsp;&nbsp; <a href="/logout">로그아웃</a></p>
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
                <tr>
                    <td colspan="4" style="text-align:center;">
                        <button onclick="location.href='/login'">로그인</button>
                    </td>
                </tr>
            </table>
        ${template.footNavBar()}
        ${template.footer()}
    `
}