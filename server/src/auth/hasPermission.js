const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

module.exports = permission => {
  return (req, res, next) => {
    if (req.user.permissions.find(p => p === permission)) {
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
