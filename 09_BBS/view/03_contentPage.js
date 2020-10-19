const template = require('./00_template');

exports.contentPage = function (uname, rows, othersReplies, myReplies) {
    let tableRow = '';
    /* 한 줄만 받을 때는 반복문 쓰면 안 되나...? */
    /* 상관없이 됐던 것 같은데... */
    // tableRow += `
    //                 <tr>
    //                     <td style="padding-right:20px;">${rows.bbs_title}</td>
    //                     <td style="padding-right:20px;">${rows.bbs_bid}</td>
    //                     <td style="padding-right:20px;">${rows.bbs_content}</td>
    //                     <td style="padding-right:20px;">${rows.bbs_modTime}</td>
    //                     <td style="padding-right:20px;">${rows.users_uid}</td>
    //                     <td style="padding-right:20px;">${rows.bbs_viewCount}</td>
    //                     <td style="padding-right:20px;">${rows.reply_comments}</td>
    //                     <td style="padding-right:20px;">${rows.reply_NumComments}</td>
    //                     <td style="padding-right:20px;">${rows.reply_isMine}</td>
    //                 </tr>

    //     `

    // console.log(tableRow);
    /* 이거 위에 키면 오류난다;;;; 왜 그러는진 모르겠음 */

    let others = '';
    for (let othersReply of othersReplies)
        others += `
        <div>
            <div>${othersReply.reply_uname} ${othersReply.reply_regTime} 
            <a href="">댓글삭제</a></div>
            <div>${othersReply.reply_comments}</div>
        </div>
        `
    let mine = '';
    for (let myReply of myReplies)
        mine += `
        <div>
            <div>${myReply.reply_uname} ${myReply.reply_regTime} 
            <a href="">댓글삭제</a></div>
            <div>${myReply.reply_comments}</div>
        </div>
            `
    /* 여기 위에서 제대로 안 들어옴 */

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
                <a href="/content/bid/${rows.bbs_bid}/update">수정</a>
                <a href="/content/bid/${rows.bbs_bid}/delete">삭제</a>
            </div>
        </div>
        <br>
        <hr>
        <div class="row">
            <div class="col-8 mr-auto">
                ${mine}
            </div>
            <div class="col-8 ml-auto">
               ${others}
            </div>
        </div>
        <br><br>
        <div class="row">
            <div class="col-10 ml-auto">
            <form action="/content/reply" method="post">
                <input type="hidden" name="bid" value="${rows.bbs_bid}">
                <textarea class="form-control" name="comments" id="comments"></textarea>
        
            </div>


            <div class="col-2 mr-auto">
                <button type="submit" class="btn btn-outline-primary btn-sm active">제출</button>
            </div>
            </form>
        </div>
        </div>
    ${template.footNavBar()}
    ${template.footer()}
    `
}