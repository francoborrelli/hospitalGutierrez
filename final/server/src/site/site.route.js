const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../validation/param-validation');
const siteCtrl = require('./site.controller');
const hasPermission = require('../auth/hasPermission');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router();

router
  .route('/')
  .get(siteCtrl.list)
  .patch(
    expressJwt({ secret: config.jwtSecret }),
    hasPermission('config_update'),
    validate(paramValidation.updateSite),
    siteCtrl.patch
  );

module.exports = router;
