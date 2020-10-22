const template = require('./00_template');

exports.myPage = function (uname, result) {
    /* 바디 아래부터 */
    return `
    ${template.header()}
    ${template.headNavBar(uname)} 
        <div class="container" style="padding-top:40px">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form action="/user/myPage" method="post">
                    <table class="table table-borderless">
                        <tr>
                            <div class="form-group">
                                <td><label for="uid">사용자 아이디</label></td>
                                <td><input class="form-control" type="text" name="uid" id="uid" value="${result.uid}"></td>
                            </div>
                        </tr>
                        <tr>
                            <div class="form-group">
                                <td><label for="pwd">패스워드 변경</label></td>
                                <td><input class="form-control" type="password" name="pwd" id="pwd"></td>
                            </div>
                        </tr>
                        <tr>
                            <div class="form-group">
                                <td><label for="pwd2">패스워드 변경 확인</label></td>
                                <td><input class="form-control" type="password" name="pwd2" id="pwd2"></td>
                            </div>
                        </tr>
                        <tr>
                            <div class="form-group">
                                <td>닉네임</td>
                                <td><input class="form-control" type="text" name="uname" id="uname" value="${result.uname}"></td>
                            </div>
                            </tr>
                        <tr>
                            <div class="form-group">
                                <td>전화번호</td>
                                <td><input class="form-control" type="text" name="tel" id="tel" value="${result.tel}"></td>
                            </div>
                        </tr>
                        <tr>
                            <div class="form-group">
                                <td>이메일</td>
                                <td><input class="form-control" type="text" name="email" id="email" value="${result.email}"></td>
                            </div>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <button type="submit" class="btn btn-outline-primary btn-sm active">수정</button>
                                <button type="submit" class="btn btn-outline-danger btn-sm">취소</button>
                            </td>
                        </tr>

                    </table>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
    ${template.footNavBar()}
    ${template.footer()}
    `
}