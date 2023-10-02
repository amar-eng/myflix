const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUsers, saveUsers } = require('../models/user');

// Load environment variables from .env file
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const users = getUsers();

  // Check if user already exists
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers(users);

  // Generate JWT for the new user
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    process.env.SECRET,
    { expiresIn: '1h' }
  );

  res.status(201).json({
    message: 'User registered and logged in successfully',
    username: newUser.username,
    token,
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const users = getUsers();
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.SECRET, // Use the SECRET from .env file
    { expiresIn: '4d' }
  );

  res.json({ username, token });
});

router.get('/', (req, res) => {
  const users = getUsers();

  // Return users without their passwords
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);

  res.json(usersWithoutPasswords);
});

module.exports = router;
