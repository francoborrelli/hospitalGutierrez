const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const bcrypt = require('bcrypt');

const User = require('./user.model');
const Role = require('../role/role.model');

async function get(req, res) {
  try {
    const user = await User.get(req.user._id);
    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  if (await User.findByEmail(req.body.email)) {
    const err = new APIError(
      'Email already used',
      httpStatus.BAD_REQUEST,
      true
    );
    return next(err);
  }

  const password = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password,
    active: true,
    roles: req.body.roles
  });

  user
    .save()
    .then(savedUser => res.json({ _id: savedUser._id, email: savedUser.email }))
    .catch(e => next(e));
}

async function patch(req, res, next) {
  try {
    const user = await User.get(req.user._id);
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.body.roles && (!req.body.roles.length || req.body.roles.length)) {
      user.roles = req.body.roles;
    }
    // TODO: validar email
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.active === false || req.body.active) {
      user.active = req.body.active;
    }
    user
      .save()
      .then(savedUser => res.json(savedUser))
      .catch(e => next(e));
  } catch (error) {
    return next(error);
  }
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

async function remove(req, res, next) {
  try {
    const user = await User.get(req.user._id);
    const deleterUser = await user.remove();
    res.json(deletedUser);
  } catch (error) {
    return next(error);
  }
}

async function addRole(req, res, next) {
  try {
    const user = await User.get(req.user._id);
    const role = await Role.findById(req.body.roleId).exec();
    if (!role) {
      const err = new APIError(
        'Role does not exist',
        httpStatus.BAD_REQUEST,
        true
      );
      return next(err);
    }
    if (user.hasRole(role.id)) {
      const err = new APIError(
        'User already has role',
        httpStatus.BAD_REQUEST,
        true
      );
      return next(err);
    }
    user.roles.push(req.body.roleId);
    user
      .save()
      .then(savedUser => res.json(savedUser))
      .catch(e => next(e));
  } catch (error) {
    return next(error);
  }
}

async function removeRole(req, res, next) {
  try {
    const user = await User.get(req.user._id);
    const role = await Role.findById(req.params.roleId).exec();
    if (!role) {
      const err = new APIError(
        'Role does not exist',
        httpStatus.BAD_REQUEST,
        true
      );
      return next(err);
    }
    if (!user.hasRole(role.id)) {
      const err = new APIError(
        'User doesn not have the role',
        httpStatus.BAD_REQUEST,
        true
      );
      return next(err);
    }
    user.roles.remove(req.params.roleId);
    user
      .save()
      .then(savedUser => res.json(savedUser))
      .catch(e => next(e));
  } catch (error) {
    return next(error);
  }
}

async function checkEmail(req, res, next) {
  const user = await User.findByEmail(req.query.email);
  res.json(user !== null);
}

module.exports = {
  load,
  get,
  create,
  patch,
  list,
  remove,
  addRole,
  removeRole,
  checkEmail
};
