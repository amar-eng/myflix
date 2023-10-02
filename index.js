const express = require('express');
const movies = require('./routes/movies');
const users = require('./routes/users');

const app = express();
app.use(express.json());

app.use('/movies', movies);
app.use('/users', users);

const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
