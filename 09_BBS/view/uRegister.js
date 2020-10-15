const template = require('./00_template');

exports.uRegister = function () {
    /* 바디 아래부터 */
    return `
    ${template.header()}
    ${template.headNavBar()} 
        <div class="container">
        <div class="row">
            <div class="col3"></div>
            <div class="col6">
                <form action="/user/register" method="post">
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="uid">사용자 아이디</label></td>
                            <td><input type="text" name="uid" id="uid"></td>
                        </tr>
                        <tr>
                            <td><label for="pwd">패스워드</label></td>
                            <td><input type="password" name="pwd" id="pwd"></td>
                        </tr>
                        <tr>
                            <td><label for="pwd2">패스워드 확인</label></td>
                            <td><input type="password" name="pwd2" id="pwd2"></td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td><input type="text" name="uname" id="uname"></td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td><input type="text" name="tel" id="tel"></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td><input type="text" name="email" id="email"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <button type="submit" class="btn btn-outline-primary btn-sm active">제출</button>
                                <button type="submit" class="btn btn-outline-danger btn-sm">취소</button>
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