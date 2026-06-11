const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// 1. ADD TO CART (Cart me product jodne ya quantity badhane ke liye)
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check karna ki kya is user ka cart pehle se bana hua hai
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Agar cart pehle se hai, toh check karo kya product bhi pehle se add hai?
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (productIndex > -1) {
        // Agar product pehle se hai, toh bas quantity badha do
        cart.products[productIndex].quantity += quantity || 1;
      } else {
        // Agar naya product hai, toh array me push kar do
        cart.products.push({ productId, quantity: quantity || 1 });
      }
      cart = await cart.save();
      return res.status(200).json({ message: "Cart update ho gaya! 🛒", cart });
    } else {
      // Agar user ka koi cart nahi tha, toh naya cart banao
      const newCart = new Cart({
        userId,
        products: [{ productId, quantity: quantity || 1 }]
      });
      await newCart.save();
      return res.status(201).json({ message: "Cart me product add ho gaya! 🛒", cart: newCart });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

// 2. GET USER CART (Kisi user ka cart dekhne ke liye)
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
    
    if (!cart) {
      return res.status(404).json({ message: "Cart khali hai!" });
    }
    
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

module.exports = router;