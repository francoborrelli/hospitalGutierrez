const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../validation/param-validation');
const clinicalReordCtrl = require('./clinicalRecord.controller');
const hasPermission = require('../auth/hasPermission');

const router = express.Router();

router
  .route('/')
  .get(hasPermission('historiaClinica_index'), clinicalRecprdCtrl.list)
  .post(
    hasPermission('control_new'),
    validate(paramValidation.createClinicalRecord),
    clinicalRecordCtrl.create
  );

module.exports = router;
