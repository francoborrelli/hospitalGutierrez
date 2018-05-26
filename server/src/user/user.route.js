const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../validation/param-validation');
const userCtrl = require('./user.controller');
const hasPermission = require('../auth/hasPermission');

const router = express.Router();

router
  .route('/')
  .get(hasPermission('usuario_index'), userCtrl.list)
  .post(
    hasPermission('usuario_new'),
    validate(paramValidation.createUser),
    userCtrl.create
  );

router
  .route('/emailExists')
  .get(validate(paramValidation.checkEmail), userCtrl.checkEmail);

router
  .route('/:userId')
  .get(userCtrl.get)
  .put(validate(paramValidation.updateUser), userCtrl.update)
  .delete(userCtrl.remove);

router
  .route('/:userId/roles')
  .post(validate(paramValidation.addRoleToUser), userCtrl.addRole);

router
  .route('/:userId/roles/:roleId')
  .delete(validate(paramValidation.removeRoleToUser), userCtrl.removeRole);

router.param('userId', userCtrl.load);

module.exports = router;
