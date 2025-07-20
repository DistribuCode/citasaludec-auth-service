const express = require('express');
const bcrypt = require('bcrypt');
const { createUser } = require('../models/userModel');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);

router.post('/internal', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing data' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    await createUser(username, hashed);
    res.status(201).json({ message: 'User added to auth-db' });
  } catch (err) {
    console.error('❌ Error en /internal:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
