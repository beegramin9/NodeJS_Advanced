const http = require('http');
const jade = require('jade');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('03_jade.jade', 'utf8', (error, data) => {
        let fn = jade.compile(data);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fn());
    })
}).listen(3000, () => {
    console.log('Server running at localhost:3000');
})