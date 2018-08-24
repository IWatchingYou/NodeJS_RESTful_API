const mongoose = require('mongoose');

var newSchema = new mongoose.Schema({
  title: String,
  description: String,
  uploads: Array,
  created_at: {
    type: Date,
    default: new Date(+new Date() + 7*24*60*60*1000)
  }
});

module.exports = mongoose.model('New', newSchema);