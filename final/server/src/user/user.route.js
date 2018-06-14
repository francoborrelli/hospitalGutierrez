const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../validation/param-validation');
const userCtrl = require('./user.controller');
const hasPermission = require('../auth/hasPermission');

const router = express.Router();

router
  .route('/')
  .get(hasPermission('usuario_index'), userCtrl.list)
  .post(hasPermission('usuario_new'), validate(paramValidation.createUser), userCtrl.create);

router
  .route('/emailExists')
  .get(validate(paramValidation.checkEmail), userCtrl.checkEmail);

router
  .route('/:userId')
  .get(userCtrl.get)
  .patch(hasPermission('usuario_update'), validate(paramValidation.patchUser), userCtrl.patch)
  .delete(userCtrl.remove);

router
  .route('/:userId/roles')
  .post(hasPermission('usuario_update'), validate(paramValidation.addRoleToUser), userCtrl.addRole);

router
  .route('/:userId/roles/:roleId')
  .delete(hasPermission('usuario_update'), validate(paramValidation.removeRoleToUser), userCtrl.removeRole);

module.exports = router;
