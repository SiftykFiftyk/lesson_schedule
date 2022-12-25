const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();

const PORT = 80;

const createPath = (page) => path.resolve(__dirname, 'files', `${page}.html`);

function intervalFunc() {
  console.log('Cant stop me now!');
}

setInterval(intervalFunc, 10000);

app.listen(PORT, (error) => {   
    error ? console.log(error) : console.log(`Server listening port ${PORT}`);
}); 

app.get('/', (req, res) => {
    res.sendFile(createPath('index'));
});

app.use(favicon('favicon.ico'));

app.use((req, res) => {
    res
     .status(404)
     .sendFile(createPath('error'));
});
