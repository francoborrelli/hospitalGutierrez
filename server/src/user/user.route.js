const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../validation/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router();

router
  .route('/')
  .get(userCtrl.list)

  .post(validate(paramValidation.createUser), userCtrl.create);

router
  .route('/:userId')
  .get(userCtrl.get)

  .put(validate(paramValidation.updateUser), userCtrl.update)

  .delete(userCtrl.remove);

router.route('/:userId/roles').patch(userCtrl.addRole);

router.param('userId', userCtrl.load);

module.exports = router;
