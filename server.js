const express = require('express');
const xlsx = require('xlsx');
const axios = require('axios');
const favicon = require('serve-favicon');
const fs = require("fs");
const path = require('path');

const app = express();

const PORT = 80;

const htmlPath = (page) => path.resolve(__dirname, 'files', `${page}.html`);
const xlsxPath = (xlsxPage) => path.resolve(__dirname, 'files', 'data', `${xlsxPage}.xlsx`);

var data = {};

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server listening port ${PORT}`);
});

app.get('/json', (req, res) => {
  res.send(data);
});

app.get('/', (req, res) => {
  res.sendFile(htmlPath('index'));
});

app.use(favicon('favicon.ico'));

app.use((req, res) => {
  res
    .status(404)
    .sendFile(htmlPath('error'));
});

updateXlsx();

async function updateXlsx() {
  const url = 'https://docs.google.com/spreadsheets/export?format=xlsx&id=1e2icr-P3FD9gQBUhsJZTTVyzt6UVSeBL'
  const writer = fs.createWriteStream(xlsxPath('data'));

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      updateJson();
    });
    writer.on('error', reject);
  });
}

function updateJson() {

}

setInterval(updateXlsx, 600000);