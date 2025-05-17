
const mongoose = require('mongoose');

const lawSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true }, 
  title: { type: String },
  rights: [String],
  actions: [String],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Law', lawSchema);
