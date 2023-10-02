const express = require('express');
const app = express();

const path = require('path');
const movies = require('./routes/movies');
const users = require('./routes/users');
const cors = require('cors');

require('dotenv/config');

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve static assets from the "data/assets" directory
app.use('/assets', express.static(path.join(__dirname, 'data', 'assets')));

// Routes
app.use('/movies', movies);
app.use('/users', users);

const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
