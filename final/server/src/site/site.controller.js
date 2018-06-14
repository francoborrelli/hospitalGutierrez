const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Site = require('./site.model');

async function patch(req, res, next) {
  try {
    const sites = await Site.find();
    const site = sites[0];
    if (req.body.email) {
      site.email = req.body.email;
    }
    if (req.body.title) {
      site.title = req.body.title;
    }
    if (req.body.footer) {
      site.footer = req.body.footer;
    }
    if (req.body.listAmount) {
      site.listAmount = req.body.listAmount;
    }
    if (req.body.enabled || req.body.enabled === false) {
      site.enabled = req.body.enabled;
    }
    site
      .save()
      .then(savedSite => res.json(savedSite))
      .catch(e => next(e));
  } catch (error) {
    const err = new APIError('Site does not exist', httpStatus.NOT_FOUND);
    return next(err);
  }
}

async function list(req, res, next) {
  try {
    const sites = await Site.find();
    res.json(sites[0]);
  } catch (error) {
    const err = new APIError('Site does not exist', httpStatus.NOT_FOUND);
    return next(err);
  }
}

module.exports = { patch, list };
