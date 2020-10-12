module.exports = {
    mainForm: function (content) {
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
                    ${content}
                </table>
            </body>

            </html>
        `
    }

}