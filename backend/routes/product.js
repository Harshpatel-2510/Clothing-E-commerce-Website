const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. ADD PRODUCT (Ab bina vendor ID ke direct add hoga)
router.post('/add', async (req, res) => {
  try {
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
    res.status(201).json({ message: "Product successfully add ho gaya! 📦", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

// 2. GET ALL PRODUCTS (Saare products dekhne ke liye)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find(); // Ab populate karne ki zaroorat nahi hai
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server me koi gadbad hui hai." });
  }
});

// 3. UPDATE PRODUCT (Product badalne ke liye - URL me ID bhejenge)
router.put('/update/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    // findByIdAndUpdate database me id dhoond kar use naye data se badal deta hai
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

// 4. DELETE PRODUCT (Product hatane ke liye - URL me ID bhejenge)
router.delete('/delete/:id', async (req, res) => {
  try {
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