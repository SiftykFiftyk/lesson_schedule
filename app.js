const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
    console.log("Server request");
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'application/json');

    const data = JSON.stringify([
        { name: 'Loh', age: 55},
        { name: 'Kal', age: 44}
    ])

    res.end(data);
});

server.listen(PORT, 'localhost', (error) => {   
    error ? console.log(error) : console.log(`Server listening port ${PORT}`);
});