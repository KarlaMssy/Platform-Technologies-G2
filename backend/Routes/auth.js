const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../firebase-plattech');

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userRef = db.collection('users').doc(username);
    const doc = await userRef.get();

    if (doc.exists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userRef.set({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userRef = db.collection('users').doc(username);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = doc.data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
