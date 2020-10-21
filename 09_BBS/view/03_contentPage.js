const template = require('./00_template');

<<<<<<< HEAD
exports.contentPage = function (uname, result, othersReplies, myReplies) {
    let mine = '';
    for (let myReply of myReplies)
        mine += `
        <div>
            <div>${myReply.reply_uname} ${myReply.reply_regTime} 
            <form action="/content/reply/delete" method="post">
                <input type="hidden" name="rid" id="rid" value="${myReply.reply_rid}">
                <input type="hidden" name="bid" id="bid" value="${result.bbs_bid}">
                <button type="submit" class="btn btn-outline-primary btn-sm active">삭제</button>
            </form>
            <a href="">댓글삭제</a></div>
            <div>${myReply.reply_comments}</div>
        </div>
            `
=======
exports.contentPage = function (sessionUname, result, wholeComments) {
    let total = ``

    for (let comment of wholeComments)
        if (comment.reply_isMine === 0) {


            total += `
            <div class="col-8 ml-auto" style="padding-top:10px; padding-bottom:10px;">
                <div class="card text-dark">
                    <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                                <strong>${comment.reply_uname}</strong>
                                <span class="text-body">${comment.reply_regTime}</span> 

                        </div>
                        <div class="col-2 ml-auto">
                            <div>
                            <form action="/content/reply/delete" method="post">
                                <input type="hidden" name="uname" value="${comment.reply_uname}">
                                <input type="hidden" name="rid" id="rid" value="${comment.reply_rid}">
                                <input type="hidden" name="bid" id="bid" value="${result.bbs_bid}">
                                <button type="submit" class="btn btn-outline-danger btn-sm">
                                <i class="fas fa-trash-alt"></i>
                                </button>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div>${comment.reply_comments}</div>
                </div>
            </div>
            </div>
            
            
            
                

                    `
        } else {
            total += `
            
            <div class="col-8 mr-auto" style="padding-top:10px; padding-bottom:10px;">
                <div class="card bg-light text-dark">
                    <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                            <div>
                            <strong>${comment.reply_uname}</strong>
                            <span class="text-body">${comment.reply_regTime}</span> 
                            </div>
                        </div>
                        <div class="col-2 ml-auto">
                            <div>
                            <form action="/content/reply/delete" method="post">
                                <input type="hidden" name="uname" value="${comment.reply_uname}">
                                <input type="hidden" name="rid" id="rid" value="${comment.reply_rid}">
                                <input type="hidden" name="bid" id="bid" value="${result.bbs_bid}">
                                <button type="submit" class="btn btn-outline-danger btn-sm">
                                <i class="fas fa-trash-alt"></i>
                                </button>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div>${comment.reply_comments}</div>
                    </div>
                </div>
                </div>
               
                `
        }

>>>>>>> 4eeec8e426852d520f3536f8207515da4b875563

    return `
    ${template.header()}
    ${template.headNavBar(sessionUname)}
    <div class="container mt-5">
        <div class="row">
            <div class="col-10">
                <div>
                    <span class="text-body lead font-weight-bolder">${result.bbs_title}</span>
                </div>
                <div>
                    <p>
                    <span class="text-body font-weight-bold">글 번호:</span>
                    ${result.bbs_bid} 
                    <span class="text-body font-weight-bold">작성 시간: </span>
                    ${result.bbs_modTime}
                    </p>
                </div>
            </div>
            <div class="col-2 ml-auto">
                <div>
                    <span class="text-body font-weight-bold">${result.users_uname}</span>
                </div>
                <div>
                    <p>
                    <span class="text-body font-weight-bold">조회</span>
                    ${result.bbs_viewCount} 
                    <span class="text-body font-weight-bold">리플</span>
                    ${result.reply_NumComments}
                    </p>
                </div>
            </div>
        </div>
        <br>
        <hr>
        <div class="row">
            <div class="col-10 mr-auto">
                <div>
                    <span class="text-body lead">${result.bbs_content}</span>
                </div>
            </div>
        <br>
        </div>
         <div class="row">
            <div class="col-2 ml-auto">
                <a class="btn btn-outline-primary btn-sm" href="/content/bid/${result.bbs_bid}/update">
                    <i class="fas fa-edit"></i>
                </a>
                <a class="btn btn-outline-danger btn-sm" href="/content/bid/${result.bbs_bid}/delete">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>
        </div>
        <br>
        <hr>
        <div class="row">
            ${total}
        </div>
        <br><br>
        <div class="row">
            <div class="col-11">
            <form action="/content/reply/create" method="post">
                <input type="hidden" name="bid" value="${result.bbs_bid}">
                <textarea class="form-control" name="comments" id="comments"></textarea>
        
            </div>


            <div class="col-1 mr-auto">
                <button type="submit" class="btn btn-outline-primary btn-sm">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            </form>
        </div>
        </div>
    ${template.footNavBar()}
    ${template.footer()}
    `
}