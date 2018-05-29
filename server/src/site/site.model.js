const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  description: {
    type: String,
    required: true,
  },
  mantaintment: {
    type: Boolean,
    required: true
  },
  elements: {
    type: Number,
    required: true,
    min: 1
  }
});

SiteSchema.method({});

SiteSchema.statics = {};

module.exports = mongoose.model('Site', SiteSchema, 'site');
