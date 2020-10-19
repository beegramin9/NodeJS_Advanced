const template = require('./00_template');

exports.updateContentPage = function (uname, result) {
    /* 여기에 새 게시물 아이디도 필요함. 이따가 post할 때 params로 넣어주려면 */
    /* 그러면 이제 어떻게 bbs_bid를 1 더하냐... */
    /* sql문에 쿼리를 두개, 어쩌면 3개까지도 써야할지도 */


    // let tableRow = '';
    // /* 한 줄만 받을 때는 반복문 쓰면 안 되나...? */
    // /* 상관없이 됐던 것 같은데... */
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
    // console.log(row.bbs_bid);

    /* form을 hidder으로 해서 uname을 받아야겠네... */
    return `
    ${template.header()}
    ${template.headNavBar(uname)}
        <h3>글 수정</h3>
        <div class="container">
        <div class="row">   
            <div class="col3"></div>
            <div class="col6">
                <form action="/content/bid/:bid/update" method="post">
                    
                    <input type="hidden" name="bid" id="bid" value="${result.bid}">
                
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="title">글 제목</label></td>
                            <td><input type="text" name="title" id="title" value="${result.title}"></td>
                        </tr>
                        <tr>
                            <td><label for="content">글 내용</label></td>
                            <td><input type="text" name="content" id="content" value="${result.content}"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <button type="submit" class="btn btn-outline-primary btn-sm active">제출</button>
                                <button type="dismiss" class="btn btn-outline-danger btn-sm">취소</button>
                            </td>
                        </tr>

                    </table>
                </form>
            </div>
            <div class="col3"></div>
        </div>
    </div>



    ${template.footNavBar()}
    ${template.footer()}
    `
}