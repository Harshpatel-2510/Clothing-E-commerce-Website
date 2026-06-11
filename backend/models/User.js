const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Iske bina account nahi banega
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ek email se ek hi account banega
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'seller', 'admin'], // In teeno me se hi koi ek role hoga
    default: 'customer' // Agar kuch select nahi kiya, toh wo customer banega
  }
}, {
  timestamps: true // Yeh automatic 'createdAt' aur 'updatedAt' time jod dega
});

const bcrypt = require('bcryptjs');

// Yeh code user save hone se theek pehle chalega
userSchema.pre('save', async function() {
  // Agar password change nahi hua hai toh aage badho
  if (!this.isModified('password')) return;
  
  // Password ko encrypt (hash) karna
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Is model ko export kar rahe hain taaki baaki files me use kar sakein
module.exports = mongoose.model('User', userSchema);