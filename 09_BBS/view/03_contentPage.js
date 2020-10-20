const template = require('./00_template');

exports.contentPage = function (sessionUname, result, wholeComments) {
    let total = ``

    for (let comment of wholeComments)
        if (comment.reply_isMine === 0) {


            total += `
            <div class="col-8 ml-auto">
                <div class="row">
                    <div class="col-8">
                        <div>
                            ${comment.reply_uname} ${comment.reply_regTime} 
                        </div>
                    </div>
                    <div class="col-4 ml-auto">
                        <div>
                        <form action="/content/reply/delete" method="post">
                            <input type="hidden" name="uname" value="${comment.reply_uname}">
                            <input type="hidden" name="rid" id="rid" value="${comment.reply_rid}">
                            <input type="hidden" name="bid" id="bid" value="${result.bbs_bid}">
                            <button type="submit" class="btn btn-outline-primary btn-sm active">삭제</button>
                        </form>
                        </div>
                    </div>
                </div>
                <div>${comment.reply_comments}</div>
            </div>
                    `
        } else {
            total += `
            <div class="col-8 mr-auto">
                <div class="row">
                    <div class="col-8">
                        <div>
                        ${comment.reply_uname} ${comment.reply_regTime} 
                        </div>
                    </div>
                    <div class="col-4 ml-auto">
                        <div>
                        <form action="/content/reply/delete" method="post">
                            <input type="hidden" name="uname" value="${comment.reply_uname}">
                            <input type="hidden" name="rid" id="rid" value="${comment.reply_rid}">
                            <input type="hidden" name="bid" id="bid" value="${result.bbs_bid}">
                            <button type="submit" class="btn btn-outline-primary btn-sm active">삭제</button>
                        </form>
                        </div>
                    </div>
                </div>
                <div>${comment.reply_comments}</div>
            </div>
                `
        }


    return `
    ${template.header()}
    ${template.headNavBar(sessionUname)}
    <div class="container">
        <div class="row">
            <div class="col-10">
                <div>
                    <strong>${result.bbs_title}</strong>
                </div>
                <div>
                    <strong>글 번호: ${result.bbs_bid} | ${result.bbs_modTime}</strong>
                </div>
            </div>
            <div class="col-2 ml-auto">
                <div>
                    <strong>${result.users_uname}</strong>
                </div>
                <div>
                    <strong>조회 ${result.bbs_viewCount} 리플 ${result.reply_NumComments}</strong>
                </div>
            </div>
        </div>
        <br>
        <hr>
        <div class="row">
            <div class="col-10 mr-auto">
                <div>
                    <strong>${result.bbs_content}</strong>
                </div>
            </div>
        <br>
        </div>
         <div class="row">
            <div class="col-2 ml-auto">
                <a href="/content/bid/${result.bbs_bid}/update">수정</a>
                <a href="/content/bid/${result.bbs_bid}/delete">삭제</a>
            </div>
        </div>
        <br>
        <hr>
        <div class="row">
            ${total}
        </div>
        <br><br>
        <div class="row">
            <div class="col-10 ml-auto">
            <form action="/content/reply/create" method="post">
                <input type="hidden" name="bid" value="${result.bbs_bid}">
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