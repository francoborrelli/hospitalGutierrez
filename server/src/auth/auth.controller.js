const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');

function getAuthError() {
  return new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
}

async function login(req, res, next) {
  const user = await User.findByEmail(req.body.email);
  if (!user) return next(getAuthError());
  const match = await bcrypt.compare(req.body.password, user.password);
  const permissions = user.getPermissions();

  if (match) {
    const token = jwt.sign(
      { _id: user.id, username: user.username, permissions },
      config.jwtSecret
    );
    return res.json({ token });
  }
  return next(getAuthError());
}

async function newToken(req, res, next) {
  const user = await User.findById(req.user._id).populate({
    path: 'roles',
    populate: { path: 'permissions', model: 'Permission' }
  });
  const permissions = user.getPermissions();

  const token = jwt.sign(
    { _id: user.id, username: user.username, permissions },
    config.jwtSecret
  );
  return res.json({ token });
}

module.exports = { login, newToken };
