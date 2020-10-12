exports.mainForm = function (rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `
                    <tr>
                        <td>${row.ggid}</td>
                        <td>${row.NAME}</td>
                        <td>${row.debut.toISOString().substring(0, 10)}</td>
                        <td>${row.hit_song_Id}</td>

                        <td>
                            <a href="/update/${row.ggid}">수정</a>
                            <a href="/delete/${row.ggid}">삭제</a>
                        </td>
                    </tr>
        
        `
    }
    return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>걸그룹 조회</title>
        </head>
        <body>
            <h3>걸그룹 조회</h3>
            <hr>
            <table>
                <tr>
                    <th>ID</th>
                    <th>걸그룹</th>
                    <th>데뷔일</th>
                    <th>Hit_Song_Id</th>
                    <th>액션</th>
                </tr>
                ${tableRow}
            </table>
        </body>
        </html>
    `
}