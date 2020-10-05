const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/' || req.url === 'favicon.icc') {
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forever</title>
        </head>
        
        <body>
            <h1>Forever</h1>
        </body>
        
        </html>
        `)
    } else {
        error.error.error;
    }
}).listen(3000, () => {
    console.log('Server running at localhost:3000')
})