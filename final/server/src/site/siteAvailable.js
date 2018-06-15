const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Site = require('../site/site.model');

module.exports = () => {
  return async (req, res, next) => {
    try {
      const sites = await Site.find();
      const site = sites[0];
      if (site.enabled) {
        return next();
      } else {
        const err = new APIError(
          'Site is unavailable',
          httpStatus.SERVICE_UNAVAILABLE,
          true
        );
        return next(err);
      }
    } catch (error) {
      const err = new APIError('Site does not exist', httpStatus.NOT_FOUND);
      return next(err);
    }
  };
};
