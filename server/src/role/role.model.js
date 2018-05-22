const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * User Schema
 */
const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
RoleSchema.method({});

/**
 * Statics
 */
RoleSchema.statics = {};

/**
 * @typedef Role
 */
module.exports = mongoose.model('Role', RoleSchema);
