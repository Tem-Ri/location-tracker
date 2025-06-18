const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;
  const timestamp = new Date().toISOString();

  const log = `Time: ${timestamp} | Latitude: ${latitude} | Longitude: ${longitude}\n`;
  fs.appendFile('locations.txt', log, err => {
    if (err) console.error('Error saving location:', err);
  });

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Location server listening at http://localhost:${port}`);
});