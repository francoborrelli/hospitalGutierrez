const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * User Schema
 * TODO: Ver validaciones y password
 */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  active: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.method({
  hasRole(roleId) {
    let hasRole = false;
    this.roles.forEach(role => {
      if (role.id === roleId) {
        hasRole = true;
      }
    });
    return hasRole;
  },

  getPermissions() {
    const permissions = [];
    this.roles.forEach(role => {
      role.permissions.forEach(permission => {
        if (!permissions.find(p => p.id === permission.id)) {
          permissions.push(permission);
        }
      });
    });
    return permissions.map(p => p.name);
  }
});

UserSchema.statics = {
  get(id) {
    return this.findById(id)
      .populate({
        path: 'roles',
        populate: { path: 'permissions', model: 'Permission' }
      })
      .exec()
      .then(user => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  findByEmail(email) {
    return this.findOne({ email })
      .populate({
        path: 'roles',
        populate: { path: 'permissions', model: 'Permission' }
      })
      .exec();
  },

  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

module.exports = mongoose.model('User', UserSchema);
