module.exports = {
    mainForm: function (rows) {
        let tablerow = '';
        for (let row of rows) {
            tablerow += `<tr>
            <td>${row.sid}</td>
            <td>${row.title}</td>
            <td>${row.lyrics}</td>
            </tr>
            `
        }
        return `
        <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>DB에 노래 가사 넣기</title>
            </head>

            <body>
                <h3>DB에 노래 가사 넣기</h3>
                <hr>
                <table>
                    <thead>
                        <th>도시명</th>
                        <th>인구수</th>
                        <th>공식언어</th>
                    </thead>

                    ${tablerow}
                </table>
            </body>

            </html>
        `
    },
    insertForm: function () {
        return `
        <!DOCTYPE html>
            <html lang="en">
                
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Login page</title>
            </head>
                
            <body>
                <h1>Login page</h1>
                <hr>
                <form action="/insert" method="POST">
                    <table>
                        <tr>
                            <td><label for="title">노래 이름: </label></td>
                            <td><input type="text" name="title" id="title"></td>
                        </tr>
                        <tr>
                            <td><label for="lyrics">가사: </label></td>
                            <!-- label은 그냥 이름 써주는 애. 비밀번호 칸이랑 줄이 맞춰서 나온다 -->
                            <td><input type="text" name="lyrics" id="lyrics"></td>
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


}