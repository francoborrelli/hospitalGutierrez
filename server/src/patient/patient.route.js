const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../validation/param-validation');
const patientCtrl = require('./patient.controller');
const hasPermission = require('../auth/hasPermission');
const clinicalRecordCtrl = require('../clinicalRecord/clinicalRecord.controller');

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
  .get(validate(paramValidation.checkDocument), patientCtrl.checkDocument);

router
  .route('/:patientId')
  .get(hasPermission('paciente_show'), patientCtrl.get)
  .patch(
    hasPermission('paciente_update'),
    validate(paramValidation.patchPatient),
    patientCtrl.patch
  )
  .delete(patientCtrl.remove);

router
  .route('/:patientId/clinicalRecords')
  .post(
    hasPermission('control_new'),
    validate(paramValidation.createClinicalRecord),
    clinicalRecordCtrl.create
  );

router
  .route('/:patientId/clinicalRecords/:recordId')
  .get(hasPermission('control_show'), clinicalRecordCtrl.get);

router
  .route('/:patientId/demographicData')
  .patch(
    hasPermission('datosDemograficos_update'),
    validate(paramValidation.patchDemographicData),
    patientCtrl.patchDemographicData
  );

module.exports = router;
