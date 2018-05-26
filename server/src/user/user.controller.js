const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const bcrypt = require('bcrypt');

const User = require('./user.model');
const Role = require('../role/role.model');

function load(req, res, next, id) {
  User.get(id)
    .then(user => {
      req.user = user;
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.user);
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
  const user = req.user;

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
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const user = req.user;
  user
    .remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

async function addRole(req, res, next) {
  const user = req.user;
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
}

async function removeRole(req, res, next) {
  const user = req.user;
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
