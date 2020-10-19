const template = require('./00_template');

exports.contentPage = function (uname, rows, othersReplies, myReplies) {
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
    /* 여기서 뭐가 문제일까 */
    let others = '';
    for (let othersReply of othersReplies)
        others += `
        <div>
            <span>${othersReply.reply_uname}<span>
            <span>${othersReply.reply_comments}<span>
            <span>${othersReply.reply_regTime}<span>
            <span>${othersReply.reply_bid}<span>
        </div>
        `
    let mine = '';
    for (let myReply of myReplies)
        mine += `
        <div>
            <span>${myReply.reply_uname}<span>
            <span>${myReply.reply_comments}<span>
            <span>${myReply.reply_regTime}<span>
            <span>${myReply.reply_bid}<span>
        </div>

            `
    /* 여기 위에서 제대로 안 들어옴 */
    console.log(others);
    console.log(mine);
    // console.log(row.bbs_bid);
    return `
    ${template.header()}
    ${template.headNavBar(uname)}
    <div class="container">
        <div class="row">
            <div class="col-10">
                <div>
                    <strong>${rows.bbs_title}</strong>
                </div>
                <div>
                    <strong>글 번호: ${rows.bbs_bid} | ${rows.bbs_modTime}</strong>
                </div>
            </div>
            <div class="col-2 ml-auto">
                <div>
                    <strong>${rows.users_uname}</strong>
                </div>
                <div>
                    <strong>조회 ${rows.bbs_viewCount} 리플 ${rows.reply_NumComments}</strong>
                </div>
            </div>
        </div>
        <br>
        <hr>
        <div class="row">
            <div class="col-10 mr-auto">
                <div>
                    <strong>${rows.bbs_content}</strong>
                </div>
            </div>
        <br>
        </div>
         <div class="row">
             <div class="col-2 ml-auto">
                 <span>수정버튼</span>
                 <span>삭제버튼</span>
             </div>
         </div>
        <br>
        <hr>
        <div class="row">
            <div class="col-8 mr-auto">
               ${others}
            </div>
            <div class="col-8 ml-auto">
                ${mine}
            </div>
        </div>
        <br><br>
        <div class="row">
            <div class="col-10 ml-auto">
                <span>댓글폼 등록비이이이이이이이이이이이이이이이이이이인칸</span>
            </div>
            <div class="col-2 mr-auto">
                <span>댓글등록버튼</span>
            </div>
        </div>
        </div>
    ${template.footNavBar()}
    ${template.footer()}
    `
}