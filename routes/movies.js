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

router.put('/update/:id', (req, res) => {
  const dataPath = path.join(__dirname, '..', 'data', 'data.json');
  const { isBookmarked } = req.body;
  const id = parseInt(req.params.id, 10);

  if (typeof isBookmarked !== 'boolean') {
    return res
      .status(400)
      .json({ error: 'Invalid isBookmarked value. It must be a boolean.' });
  }

  fs.readFile(dataPath, 'utf8', (readErr, data) => {
    if (readErr) {
      return res.status(500).json({ error: 'Failed to read data.' });
    }

    const jsonData = JSON.parse(data);

    // Find the item with the specified ID
    const item = jsonData.find((entry) => entry.id === id);

    if (!item) {
      return res
        .status(404)
        .json({ error: 'Item with the specified ID not found.' });
    }

    // Update the isBookmarked value for the found item
    item.isBookmarked = isBookmarked;

    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: 'Failed to write data.' });
      }

      // Send back the updated data as a response
      res.status(200).json(item);
    });
  });
});

module.exports = router;
