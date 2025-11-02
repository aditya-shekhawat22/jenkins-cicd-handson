const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    
    if (req.url === '/health') {
        res.end(JSON.stringify({ status: 'OK', timestamp: new Date() }));
    } else if (req.url === '/') {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Jenkins CI/CD Handson</title>
                <style>
                    body { font-family: Arial; text-align: center; margin-top: 50px; }
                    .container { background: #f0f0f0; padding: 30px; border-radius: 10px; }
                    h1 { color: #333; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>✓ Jenkins CI/CD Pipeline Working!</h1>
                </div>
            </body>
            </html>
        `;
        res.end(html);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
