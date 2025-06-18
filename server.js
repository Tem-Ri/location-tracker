const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Cho phép gọi API từ trình duyệt
app.use(cors());

// Đọc dữ liệu JSON từ client
app.use(bodyParser.json());

// 👉 Phục vụ file tĩnh như index.html
app.use(express.static('public'));

// Nhận dữ liệu vị trí từ trình duyệt
app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;
  const timestamp = new Date().toISOString();

  const log = `Time: ${timestamp} | Latitude: ${latitude} | Longitude: ${longitude}\n`;
  fs.appendFile('locations.txt', log, err => {
    if (err) console.error('Error saving location:', err);
  });

  res.sendStatus(200);
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});