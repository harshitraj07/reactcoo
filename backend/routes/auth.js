const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @route POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { fullName, phone, gender, dob, country, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      phone,
      gender,
      dob,
      country,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ msg: 'Account created successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
});

module.exports = router;
