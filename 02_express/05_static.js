
const express = require('express');
const app = express();
const util = require('util')

app.use(express.static(__dirname))
/* 경로를 지정해주는 middleware */
/* 지금은 public으로 바로 해줬는데 대부분은 그냥 /으로 하고 */
/* view/html에서 부르던 때 처럼 */
/* 정적인 것들, 주로 사진, 아이콘, css파일, 글자파일
js파일(동적으로 만들어주는 건 맞는데 코드 자체는 안 바뀌잖아)은 전부 static에 넣어줌 */

/* User-Agent값 가져오기 */
app.get('/', (req, res) => {
    let html = `
    <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Express</title>
        </head>

        <body>
            <h1>Static Image</h1>
            <hr>
            <img src="/public/cat.jpg" alt="고양이">
            <img src="/ing/fox.jpg" alt="여우">
        </body>

        </html>
    `
    /* 원래는 img태그의 src를 맞게 써주면 화면에 나와야 하는데 */
    /* 지금은 안 나오지? 왜 안나올까? */
    /* 위에 app.use static middleware로  */
    res.send(html);
});

app.get('*', (req, res) => {
    res.status(404).send('Path not found')
    /* Method Chaning. 한 방에! */
});


app.listen(3002, () => util.log('Server running at http//localhost:3002'));
