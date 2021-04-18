const mongoose = require('mongoose');

const ShortUrlSchema = mongoose.Schema({
  short_url: {
    unique: true,
    required: true,
    type: String,
  },
  original_url: {
    unique: true,
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('ShortUrlSchema', ShortUrlSchema);
