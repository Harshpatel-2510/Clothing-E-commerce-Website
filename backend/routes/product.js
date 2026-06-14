const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fetchuser = require('../middleware/fetchuser');

// 1. ADD PRODUCT (Sirf Admin ke liye)
router.post('/add', fetchuser, async (req, res) => {
  try {
    // Check karo ki user admin hai ya nahi
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Aapko product add karne ki permission nahi hai! 🚫" });
    }

    const { name, description, price, category, stock, images } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images
    });

    await newProduct.save();
    res.status(201).json({ message: "Admin saab, Product successfully add ho gaya! 📦", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

// 2. GET ALL PRODUCTS (Sabke liye - bina login ke)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

// 3. UPDATE PRODUCT (Sirf Admin ke liye)
router.put('/update/:id', fetchuser, async (req, res) => {
  try {
    // Admin Check
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access Denied! Aap admin nahi hain. 🚫" });
    }

    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product nahi mila!" });
    }

    res.status(200).json({ message: "Product successfully update ho gaya! 🔄", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

// 4. DELETE PRODUCT (Sirf Admin ke liye)
router.delete('/delete/:id', fetchuser, async (req, res) => {
  try {
    // Admin Check
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access Denied! Aap admin nahi hain. 🚫" });
    }

    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product nahi mila!" });
    }

    res.status(200).json({ message: "Product database se delete ho gaya! 🗑️" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

module.exports = router;