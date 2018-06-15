const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Patient = require('./patient.model');

async function list(req, res, next) {
  try {
    const patients = await Patient.find({ deleted: false });
    return res.json(patients);
  } catch (error) {
    const err = new APIError(
      'Error fetching patients',
      httpStatus.INTERNAL_SERVER_ERROR,
      true
    );
    return next(err);
  }
}

async function create(req, res, next) {
  const existPatient = await Patient.findOne({
    documentType: req.query.documentType,
    documentNumber: req.query.documentNumber,
    deleted: false
  });
  if (existPatient) {
    const err = new APIError(
      'Patient exists create',
      httpStatus.BAD_REQUEST,
      true
    );
    return next(err);
  }

  const patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    documentNumber: req.body.documentNumber,
    birthday: new Date(req.body.birthday),
    gender: req.body.gender,
    address: req.body.address,
    hasRefrigerator: req.body.hasRefrigerator,
    hasElectricity: req.body.hasElectricity,
    hasPet: req.body.hasPet,
    documentType: req.body.documentType,
    heatingType: req.body.heatingType,
    houseType: req.body.houseType,
    waterType: req.body.waterType,
    phone: req.body.phone || null,
    insurance: req.body.insurance !== 'undefined' ? req.body.insurance : null,
    clinicalRecords: [],
    deleted: false
  });
  patient
    .save()
    .then(savedPatient => res.json(savedPatient))
    .catch(e => next(e));
}

function fieldExists(field) {
  return typeof field !== 'undefined';
}

async function patch(req, res, next) {
  try {
    const patient = await Patient.find({
      _id: req.params.patientId,
      deleted: false
    });
    if (!patient) {
      const err = new APIError('Patient not found', httpStatus.NOT_FOUND, true);
      return next(err);
    }

    if (
      patient.documentNumber !== req.body.documentNumber ||
      patient.documentType !== req.body.documentType
    ) {
      const exists = await Patient.findOne({
        documentType: req.query.documentType,
        documentNumber: req.query.documentNumber,
        deleted: false
      });
      if (exists) {
        const err = new APIError(
          'Patient exists with that document',
          httpStatus.BAD_REQUEST,
          true
        );
        return next(err);
      }
    }

    if (req.body.firstName) {
      patient.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      patient.lastName = req.body.lastName;
    }
    if (req.body.documentNumber) {
      patient.documentNumber = req.body.documentNumber;
    }
    if (req.body.birthday) {
      patient.birthday = new Date(req.body.birthday);
    }
    if (req.body.gender) {
      patient.gender = req.body.gender;
    }
    if (req.body.address) {
      patient.address = req.body.address;
    }
    if (fieldExists(req.body.phone)) {
      patient.phone = req.body.phone;
    }
    if (req.body.documentType || req.body.documentType === 0) {
      patient.documentType = req.body.documentType;
    }
    if (fieldExists(req.body.insurance)) {
      patient.insurance = req.body.insurance;
    }
    patient
      .save()
      .then(savedPatient => res.json(savedPatient))
      .catch(e => next(e));
  } catch (error) {
    return next(error);
  }
}

async function patchDemographicData(req, res, next) {
  try {
    const patient = await Patient.find({
      _id: req.params.patientId,
      deleted: false
    });
    if (!patient) {
      const err = new APIError('Patient not found', httpStatus.NOT_FOUND, true);
      return next(err);
    }
    if (fieldExists(req.body.hasRefrigerator)) {
      patient.hasRefrigerator = req.body.hasRefrigerator;
    }
    if (fieldExists(req.body.hasElectricity)) {
      patient.hasElectricity = req.body.hasElectricity;
    }
    if (fieldExists(req.body.hasPet)) {
      patient.hasPet = req.body.hasPet;
    }
    if (fieldExists(req.body.insurance)) {
      patient.insurance = req.body.insurance;
    }
    if (fieldExists(req.body.heatingType)) {
      patient.heatingType = req.body.heatingType;
    }
    if (fieldExists(req.body.houseType)) {
      patient.houseType = req.body.houseType;
    }
    if (fieldExists(req.body.waterType)) {
      patient.waterType = req.body.waterType;
    }
    patient
      .save()
      .then(savedPatient => res.json(savedPatient))
      .catch(e => next(e));
  } catch (error) {
    return next(error);
  }
}

async function get(req, res, next) {
  try {
    const patient = await Patient.find({
      _id: req.params.patientId,
      deleted: false
    }).populate({
      path: 'clinicalRecords',
      match: { deleted: { $eq: false } },
      populate: { path: 'user', model: 'User', select: 'username' }
    });
    if (!patient) {
      const err = new APIError('Patient not found', httpStatus.NOT_FOUND, true);
      return next(err);
    }
    return res.json(patient);
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    const patient = await Patient.find({
      _id: req.params.patientId,
      deleted: false
    }).populate({
      path: 'clinicalRecords',
      match: { deleted: { $eq: false } }
    });
    if (!patient) {
      const err = new APIError('Patient not found', httpStatus.NOT_FOUND, true);
      return next(err);
    }
    if (patient.clinicalRecords.length) {
      const err = new APIError('Patient cannot be deleted because he has clinical records', httpStatus.BAD_REQUEST, true);
      return next(err);
    }
    patient.deleted = true;
    patient
      .save()
      .then(() => res.send())
      .catch(e => next(e));
  } catch (error) {
    return next(error);
  }
}

async function checkDocument(req, res, next) {
  const patient = await Patient.findOne({
    documentType: req.query.documentType,
    documentNumber: req.query.documentNumber,
    deleted: false
  });
  res.json(patient !== null);
}

async function reports(req, res, next) {
  try {
    const patient = await Patient.findById(req.params.patientId).populate({
      path: 'clinicalRecords',
      match: { deleted: { $eq: false } }
    });
    if (!patient) {
      const err = new APIError('Patient not found', httpStatus.NOT_FOUND, true);
      return next(err);
    }
    const ppc = patient.getPpcReport();
    const height = patient.getHeightReport();
    const weight = patient.getWeightReport();
    return res.json({ ppc, height, weight });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  create,
  get,
  patch,
  patchDemographicData,
  remove,
  checkDocument,
  reports
};
