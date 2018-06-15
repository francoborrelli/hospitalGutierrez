const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ClinicalRecord = require('./clinicalRecord.model');
const Patient = require('../patient/patient.model');

async function create(req, res, next) {
  try {
    const patient = await Patient.findById(req.params.patientId);

    if (new Date(req.body.controlDate) < new Date(patient.birthday)) {
      const err = new APIError(
        'Control date cannot be lower than patient birthday',
        httpStatus.BAD_REQUEST,
        true
      );
      return next(err);
    }

    const clinicalRecord = new ClinicalRecord({
      controlDate: new Date(req.body.controlDate),
      weight: req.body.weight,
      height: req.body.height || null,
      pc: req.body.pc || null,
      ppc: req.body.ppc || null,
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
    const savedRecord = await clinicalRecord.save();
    patient.clinicalRecords.push(savedRecord._id);
    await patient.save();
    return res.json(savedRecord);
  } catch (error) {
    next(error);
  }
}

function fieldExists(field) {
  return typeof field !== 'undefined';
}

async function patch(req, res, next) {
  try {
    const record = await ClinicalRecord.findOne({
      _id: req.params.recordId,
      deleted: false
    });
    if (!record) {
      const err = new APIError('Record not found', httpStatus.NOT_FOUND, true);
      return next(err);
    }
    if (fieldExists(req.body.controlDate)) {
      record.controlDate = new Date(req.body.controlDate);
    }
    if (fieldExists(req.body.weight)) {
      record.weight = req.body.weight;
    }
    if (fieldExists(req.body.height)) {
      record.height = req.body.height;
    }
    if (fieldExists(req.body.pc)) {
      record.pc = req.body.pc;
    }
    if (fieldExists(req.body.ppc)) {
      record.ppc = req.body.ppc;
    }
    if (fieldExists(req.body.vaccination)) {
      record.vaccination = req.body.vaccination;
    }
    if (fieldExists(req.body.maturation)) {
      record.maturation = req.body.maturation;
    }
    if (fieldExists(req.body.fisicTest)) {
      record.fisicTest = req.body.fisicTest;
    }
    if (fieldExists(req.body.vaccinationObservation)) {
      record.vaccinationObservation = req.body.vaccinationObservation;
    }
    if (fieldExists(req.body.maturationObservation)) {
      record.maturationObservation = req.body.maturationObservation;
    }
    if (fieldExists(req.body.fisicTestObservation)) {
      record.fisicTestObservation = req.body.fisicTestObservation;
    }
    if (fieldExists(req.body.generalObservation)) {
      record.generalObservation = req.body.generalObservation;
    }
    if (fieldExists(req.body.nutrition)) {
      record.nutrition = req.body.nutrition;
    }
    if (fieldExists(req.body.user)) {
      record.user = req.body.user;
    }
    record
      .save()
      .then(savedRecord => res.json(savedRecord))
      .catch(e => next(e));
  } catch (error) {
    return next(error);
  }
}

async function get(req, res, next) {
  try {
    const record = await ClinicalRecord.findOne({
      _id: req.params.recordId,
      deleted: false
    }).populate('user', 'username');
    return res.json(record);
  } catch (error) {
    const err = new APIError('Record not found', httpStatus.NOT_FOUND, true);
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const record = await ClinicalRecord.findOne({
      _id: req.params.recordId,
      deleted: false
    });
    record.deleted = true;
    record.save();
    return res.json(record);
  } catch (error) {
    const err = new APIError('Record not found', httpStatus.NOT_FOUND, true);
    return next(err);
  }
}

module.exports = { create, get, remove, patch };
