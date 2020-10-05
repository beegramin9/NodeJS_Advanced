const express = require('express');
const app = express();

const welcome = require('./welcome')

app.get('/', (req, res) => {
    /* 지정한 주소 /가 들어오면 */
    let html = welcome.welcome()
    res.send(html);

})
app.get('*', (req, res) => {
    res.status(404).send('Path not found')
    /* Method Chaning. 한 방에! */
});
/* 내가 지정한 주소가 아니라 다른 주소가 들어오면 error메시지 발생 */


app.listen(3000, () => util.log('Server running at http//localhost:3000'));
const util = require('util')

