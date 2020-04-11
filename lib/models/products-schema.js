'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  category: { type: 'String', required: true },
  name: { type: 'String', required: true },
  display_name: { type: 'String' },
  description: { type: 'String' },
});

module.exports = mongoose.model('products', schema);