const express = require('express');
const app = express();


// localhost:3000/query?id=kim 로 접속했다고 가정하고
app.get('/query', (req, res) => {
    let id = req.query.id;
    /* 고전적인 방법: queryString을 통해서 */
    /* /path?key=value&key=value */
    /* /path 자리에 위 '/query'가 들어감 */
    res.send(`<h1>id: ${id}</h1>`);
});

// localhost:3000/rest/id/kim
app.get('/rest/id/:id', (req, res) => {
    /* REST 방식은 */
    /* /path/:parameter/:parameter */
    /* parameter는 앞에 :를 줘서 구분 */
    let id = req.params.id;
    res.send(`<h1>id: ${id}</h1>`);
});

// localhost:3000/rest2/kim   id 생략하고 가져오기
app.get('/rest/id/:id', (req, res) => {
    let id = req.params.id;
    res.send(`<h1>id: ${id}</h1>`);
});


app.get('*', (req, res) => {
    res.status(404).send('Path not found')
    /* Method Chaning. 한 방에! */
});
/* 내가 지정한 주소가 아니라 다른 주소가 들어오면 error메시지 발생 */


app.listen(3000, () => util.log('Server running at http//localhost:3000'));
const util = require('util');

