const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../validation/param-validation');
const siteCtrl = require('./site.controller');
const hasPermission = require('../auth/hasPermission');

const router = express.Router();

router
  .route('/')
  .get(hasPermission('config_index'), siteCtrl.list)
  .patch(
    hasPermission('config_update'),
    validate(paramValidation.updateSite),
    siteCtrl.patch
  );

module.exports = router;
