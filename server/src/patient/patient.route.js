const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../validation/param-validation');
const patientCtrl = require('./patient.controller');
const hasPermission = require('../auth/hasPermission');

const router = express.Router();

// TODO: Autorizacion
router
  .route('/')
  .get(hasPermission('paciente_index'), patientCtrl.list)
  .post(
    hasPermission('paciente_new'),
    validate(paramValidation.createPatient),
    patientCtrl.create
  );

router
  .route('/documentExists')
  .get(validate(paramValidation.checkDocument), patientCtrl.checkDocument)

router
  .route('/:patientId')
  .get(patientCtrl.get)
  .patch(validate(paramValidation.patchPatient), patientCtrl.patch)
  .delete(patientCtrl.remove);

router
  .route('/:patientId/demographicData')
  .patch(
    validate(paramValidation.patchDemographicData),
    patientCtrl.patchDemographicData
  );

module.exports = router;
