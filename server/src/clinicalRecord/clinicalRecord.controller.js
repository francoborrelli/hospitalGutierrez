const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ClinicalRecord = require('./clinicalRecord.model');

async function list(req, res, next) {
  try {
    const records = await ClinicalRecord.find({ deleted: false });
    return res.json(records);
  } catch (error) {
    const err = new APIError(
      'Error fetching clinical records',
      httpStatus.INTERNAL_SERVER_ERROR,
      true
    );
    return next(err);
  }
}

async function create(req, res, next) {
  const clinicalRecord = new ClinicalRecord({
    controlDate: new Date(req.body.controlDate),
    weight: req.body.weight,
    documentNumber: req.body.documentNumber,
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
  clinicalRecord
    .save()
    .then(savedRecord => res.json(savedRecord))
    .catch(e => next(e));
}

module.exports = { list, create };
