const template = require('./00_template');

exports.contentPage = function (uname, rows) {
    let tableRow = '';
    /* 한 줄만 받을 때는 반복문 쓰면 안 되나...? */
    /* 상관없이 됐던 것 같은데... */
    tableRow += `
                    <tr>
                        <td style="padding-right:20px;">${rows.bbs_title}</td>
                        <td style="padding-right:20px;">${rows.bbs_bid}</td>
                        <td style="padding-right:20px;">${rows.bbs_content}</td>
                        <td style="padding-right:20px;">${rows.bbs_modTime}</td>
                        <td style="padding-right:20px;">${rows.users_uid}</td>
                        <td style="padding-right:20px;">${rows.bbs_viewCount}</td>
                        <td style="padding-right:20px;">${rows.reply_comments}</td>
                        <td style="padding-right:20px;">${rows.reply_NumComments}</td>
                        <td style="padding-right:20px;">${rows.reply_isMine}</td>
                    </tr>
        
        `
    // console.log(row.bbs_bid);
    return `
    ${template.header()}
    ${template.headNavBar(uname)}
        <h3>글 목록</h3>
        <p><a href="/logout">로그아웃</a></p>
        <hr>
        <table>
            <tr>
                <th>제목</th>
                <th>글번호</th>
                <th>내용</th>
                <th>날짜</th>
                <th>유저아이디</th>
                <th>조회수</th>
                <th>리플</th>
                <th>남의댓글</th>
                <th>내댓글</th>
            </tr>
            ${tableRow}
            <tr>
                <td colspan="4" style="text-align:center;">
                    <button onclick="location.href='/content/bid/${rows.bbs_bid}/update'">수정</button>
                </td>
                <td colspan="4" style="text-align:center;">
                    <button onclick="location.href='/content/bid/${rows.bbs_bid}/delete'">삭제</button>
                </td>
            </tr>
        </table>





    ${template.footNavBar()}
    ${template.footer()}
    `
}