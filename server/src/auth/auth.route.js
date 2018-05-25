const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../validation/param-validation');
const authCtrl = require('./auth.controller');

const router = express.Router();

router.route('/login').post(validate(paramValidation.login), authCtrl.login);

module.exports = router;
