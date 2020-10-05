const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

http.createServer(function (req, res) {
    fs.readFile('02_ejsPage.ejs', 'utf8', (error, data) => {
        /* 파일이름을 잘못써서 replace 에러 발생했음 */
        res.writeHead(200, { 'Content-Type': 'text/html' });;
        res.end(ejs.render(data, {
            /* Argument를 객체 형태로 받아주면 ejs에서 읽고 화면에 뿌려준다. */
            name: 'RintIanTta',
            discription: 'Hello ejs with Node JS...'
        }));
        /* 클라이언트가 읽을 수 있도록 ejs를 html로 rendering하는 과정 */
    })
}).listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000');
});