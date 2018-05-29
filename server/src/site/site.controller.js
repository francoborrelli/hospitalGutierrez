const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Site = require('./site.model');

async function get(req, res, next) {
  Site
    .find({})
    .then(site => res.json(site))
    .catch(e => next(e))
}

module.exports = {
  get
};
