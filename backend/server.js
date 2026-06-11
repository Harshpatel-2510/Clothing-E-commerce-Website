require('dotenv').config(); // Ise sabse top par hona chahiye

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Database se Connect ho gaya hai! 🎉"))
  .catch((err) => console.log("Database connection error: ", err));

// Ek simple test route (Check karne ke liye ki server chal raha hai)
app.get('/', (req, res) => {
  res.send("Hamara Multi-Vendor Backend Live Hai!");
});

// Server ko start karna
const PORT = process.env.PORT || 5000;

// Routes Middleware
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/product');
app.use('/api/product', productRoutes);

const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

const orderRoutes = require('./routes/order');
app.use('/api/order', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server port ${PORT} par daud raha hai... 🏃‍♂️`);
});