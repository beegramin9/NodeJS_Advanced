
const express = require('express');
const app = express();
const util = require('util')


/* User-Agent값 가져오기 */
app.get('/', (req, res) => {
    let agent = req.header('User-Agent')
    // res.send(`<h3>${agent}</h3>`)

    if (agent.toLowerCase().match(/chrome/)) {
        res.send('크롬 브라우저입니다.')
    } else {
        res.send('크롬 브라우저가 아닙니다.')
    }
});

app.get('*', (req, res) => {
    res.status(404).send('Path not found')
    /* Method Chaning. 한 방에! */
});


app.listen(3000, () => util.log('Server running at http//localhost:3000'));
