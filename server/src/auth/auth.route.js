const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../validation/param-validation');
const expressJwt = require('express-jwt');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');

const router = express.Router();

router.route('/login').post(validate(paramValidation.login), authCtrl.login);
router
  .route('/newToken')
  .post(expressJwt({ secret: config.jwtSecret }), authCtrl.newToken);

module.exports = router;
