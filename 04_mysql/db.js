exports.html = function (content) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>연습문제 5</title>
    </head>
    
    <body>
        <h3>연습문제 5</h3>
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
