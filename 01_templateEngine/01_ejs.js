const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

http.createServer(function (req, res) {
    fs.readFile('01_ejsPage.ejs', 'utf8', (error, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });;
        res.end(ejs.render(data));
        /* 클라이언트가 읽을 수 있도록 ejs를 html로 rendering하는 과정 */
    })
}).listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000');
});