const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const SiteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  footer: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    required: true
  },
  listAmount: {
    type: Number,
    required: true
  }
});

SiteSchema.method({});

SiteSchema.statics = {
  get() {
    return this.find()
      .exec()
      .then(site => {
        if (site) {
          return site[0];
        }
        const err = new APIError('Site does not exist', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

module.exports = mongoose.model('Site', SiteSchema, 'site');
