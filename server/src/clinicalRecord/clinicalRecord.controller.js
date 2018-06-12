const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ClinicalRecord = require('./clinicalRecord.model');
const Patient = require('../patient/patient.model');

async function create(req, res, next) {
  const clinicalRecord = new ClinicalRecord({
    controlDate: new Date(req.body.controlDate),
    weight: req.body.weight,
    pc: req.body.pc,
    ppc: req.body.ppc,
    vaccination: req.body.vaccination,
    maturation: req.body.maturation,
    fisicTest: req.body.fisicTest,
    vaccinationObservation: req.body.vaccinationObservation || null,
    maturationObservation: req.body.maturationObservation || null,
    fisicTestObservation: req.body.fisicTestObservation || null,
    generalObservation: req.body.generalObservation || null,
    nutrition: req.body.nutrition || null,
    user: req.body.user,
    deleted: false
  });

  try {
    const patient = await Patient.findById(req.params.patientId);
    const savedRecord = await clinicalRecord.save();
    patient.clinicalRecords.push(savedRecord._id);
    await patient.save();
    return res.json(savedRecord);
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const record = await ClinicalRecord.findById(req.params.recordId).populate('user', 'username');
    return res.json(record);
  } catch (error) {
    const err = new APIError(
      'Record not found',
      httpStatus.NOT_FOUND,
      true
    );
    return next(err);
  }
}

module.exports = { create, get };
