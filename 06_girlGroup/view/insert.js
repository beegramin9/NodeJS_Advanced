exports.insertForm = function () {
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Song Form</title>
    </head>
    <body>
        <h3>걸그룹 추가</h3>
        <hr>
        <form action="/insert" method="post">
            <table>
                <tr>
                    <td><label for="ggname">걸그룹 이름</label></td>
                    <td><input type="text" name="ggname" id="ggname"></td>
                </tr>
                <tr>
                    <td><label for="debut">데뷔일</label></td>
                    <td><input type="text" name="debut" id="debut"></td>
                </tr>
                <tr>
                    <td><label for="hit_song_Id">히트송 ID</label></td>
                    <td><input type="text" name="hit_song_Id" id="hit_song_Id"></td>
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