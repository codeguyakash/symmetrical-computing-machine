const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const COUNT_FILE = path.join(__dirname, 'count.txt');

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/count', (req, res) => {
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

    res.json({ count });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});