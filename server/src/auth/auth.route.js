const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('../validation/param-validation');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');

const router = express.Router();

router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

module.exports = router;
