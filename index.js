const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const COUNT_FILE = path.join(__dirname, 'count.txt');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!');
    } else if (req.url === '/count' && req.method === 'GET') {
        if (!fs.existsSync(COUNT_FILE)) {
            fs.writeFileSync(COUNT_FILE, '0');
        }

        let count = fs.readFileSync(COUNT_FILE, 'utf-8').trim();

        count = parseInt(count, 10);
        if (isNaN(count)) {
            count = 0;
        }
        count += 1;

        fs.writeFileSync(COUNT_FILE, count.toString());

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ count }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
