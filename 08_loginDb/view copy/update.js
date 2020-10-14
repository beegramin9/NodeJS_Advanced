exports.updateForm = function (result) {
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>걸그룹 수정</title>
    </head>
    <body>
        <h3>걸그룹 수정</h3>
        <hr>
        <form action="/update" method="post">
            <input type="hidden" name="ggid" value="${result.ggid}">
            <table>
                <tr>
                    <td><label for="ggname">걸그룹 이름</label></td>
                    <td><input type="text" name="NAME" id="NAME" value="${result.NAME}"></td>
                </tr>
                <tr>
                    <td><label for="debut">데뷔일</label></td>
                    <td><input type="text" name="debut" id="debut" value="${result.debut.toISOString().substring(0, 10)}"></td>
                </tr>
                <tr>
                    <td><label for="hit_song_Id">히트송</label></td>
                    <td><input type="text" name="hit_song_Id" id="hit_song_Id" value="${result.hit_song_Id}"></td>
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