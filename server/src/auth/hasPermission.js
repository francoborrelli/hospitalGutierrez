const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const User = require('../user/user.model');

module.exports = permission => {
  return async (req, res, next) => {
    const user = await User.findById(req.user._id).populate({
      path: 'roles',
      populate: { path: 'permissions', model: 'Permission' }
    });
    const permissions = user.getPermissions();
    if (permissions.length !== req.user.permissions.length) {
      res.status(401);
      const token = jwt.sign(
        { _id: user.id, username: user.username, permissions },
        config.jwtSecret
      );
      return res.json({ newToken: token });
    }
    if (req.user.permissions.find(p => p === permission)) {
      res.locals.hola = 'asdkhasdkhasjkd';
      next();
    } else {
      const err = new APIError(
        'User does not have permission',
        httpStatus.FORBIDDEN,
        true
      );
      next(err);
    }
  };
};
