const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://atifa21:imfa0921@legallyhers.axmhzgb.mongodb.net/legallyhersDB?retryWrites=true&w=majority&appName=Legallyhers');
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
