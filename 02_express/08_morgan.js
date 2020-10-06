const express = require('express');
const morgan = require('morgan');
const app = express();

// app.use(morgan('combined'));
/* 모든 정보가 다 나오게 */
// app.use(morgan(':method + :date + :remote-addr'/* Ipv6 주소*/))
/* 해당 파라미터만 나오게 */

app.use(morgan('short'))

app.use((req, res) => {
    res.send(`<h1>morgan Middleware</h1>`);
})

app.listen(3000, () => console.log('Server running at http//localhost:3000'));

/* 접속할 때마다 로그가 찍힘(시간, 어떤 브라우저) */