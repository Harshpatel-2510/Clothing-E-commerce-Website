const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. SIGN UP ROUTE
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Yeh email pehle se register hai!" });
    }

    // Ab password automatic hash ho jayega (User.js ke pre-save hook ki wajah se)
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "Account successfully ban gaya hai! 🎉" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

// 2. LOGIN ROUTE (URL: /api/auth/login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check karna ki user exist karta hai ya nahi
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Galat Email ya Password!" });
    }

    // Password match karna (Dono hashes ko compare karega)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Galat Email ya Password!" });
    }

    // Agar sab sahi hai, toh JWT Token banana
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token 1 din tak valid rahega
    );

    // User ki details aur token response me bhejna
    res.status(200).json({
      message: "Login successful! Welcome back... 👋",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

module.exports = router;