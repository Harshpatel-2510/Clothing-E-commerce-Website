const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const fetchuser = require('../middleware/fetchuser');

// 1. PLACE ORDER (Naya order banane ke liye)
router.post('/place', fetchuser, async (req, res) => {
  try {
    // Ab hume body se userId mangne ki zaroorat nahi! Guard khud token se ID nikal dega.
    const userId = req.user.id; 
    const { products, totalAmount, shippingAddress } = req.body;

    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      shippingAddress
    });

    await newOrder.save();
    res.status(201).json({ message: "Order successfully place ho gaya hai! 📦🛍️", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

// 2. GET USER ORDERS (Kisi user ke saare purane orders dekhne ke liye)
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

module.exports = router;