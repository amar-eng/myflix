const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res, next) => {
  // Adjust the path to your data.json file given its location
  const dataPath = path.join(__dirname, '..', 'data', 'data.json');

  // Read the file asynchronously
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data.' });
    }

    // Parse the data and send as a response
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  });
});

module.exports = router;
