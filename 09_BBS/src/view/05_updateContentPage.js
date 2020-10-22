const template = require('./00_template');

exports.updateContentPage = function (uname, result) {

    return `
    ${template.header()}
    ${template.headNavBar(uname)}
        <h3>글 수정</h3>
        <div class="container">
        <div class="row">   
            <div class="col3"></div>
            <div class="col6">
                <form action="/content/update/bid/:bid" method="post">
                    
                    <input type="hidden" name="bid" id="bid" value="${result.bbs_bid}">
                
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="title">글 제목</label></td>
                            <td><input class="form-control" type="text" name="title" id="title" value="${result.bbs_title}"></td>
                        </tr>
                        <tr>
                            <td><label for="content">글 내용</label></td>
                            <td><textarea class="form-control" name="content" id="content">${result.bbs_content}</textarea>
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