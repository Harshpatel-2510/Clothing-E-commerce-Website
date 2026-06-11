const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Yeh cart kis user ka hai
    required: true,
    unique: true // Ek user ka ek hi cart hoga
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Kaun sa product add kiya hai
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
      }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);