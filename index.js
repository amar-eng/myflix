const express = require('express');
const movies = require('./routes/movies');

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use('/movies', movies);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
