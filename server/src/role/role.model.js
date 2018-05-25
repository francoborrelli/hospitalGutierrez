const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

require('../permission/permission.model');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission'
    }
  ]
});

RoleSchema.method({});

RoleSchema.statics = {};

module.exports = mongoose.model('Role', RoleSchema);
