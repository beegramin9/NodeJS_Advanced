exports.updateForm = function (result) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login page</title>
    </head>
        
    <body>
        <h1>Update page</h1>
        <hr>
        <form action="/update" method="POST">
            <input type="hidden" name="sid" value="${result.sid}"
            <table>
                <tr>
                    <td><label for="title">노래 이름: </label></td>
                    <td><input type="text" name="title" id="title" value="${result.title}"></td>
                </tr>
                <tr>
                    <td><label for="lyrics">가사: </label></td>
                    <!-- label은 그냥 이름 써주는 애. 비밀번호 칸이랑 줄이 맞춰서 나온다 -->
                    <td><input type="text" name="lyrics" id="lyrics" value="${result.lyrics}"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="제출"></td>
                </tr>
            </table>
        </form>
    </body>
        
    </html>
    `
}