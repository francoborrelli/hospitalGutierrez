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

// TODO: validar restricciones
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
    clinicalRecords: [],
    deleted: false
  });
  if (req.body.insurance || req.body.insurance === 0) {
    patient.insurance = req.body.insurance;
  }
  if (req.body.phone) {
    patient.phone = req.body.phone;
  }
  patient
    .save()
    .then(savedPatient => res.json(savedPatient))
    .catch(e => next(e));
}

async function patch(req, res, next) {
  try {
    const patient = await Patient.findById(req.params.patientId);
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
    if (req.body.phone) {
      patient.phone = req.body.phone;
    }
    if (req.body.documentType || req.body.documentType === 0) {
      patient.documentType = req.body.documentType;
    }
    if (req.body.insurance || req.body.insurance === 0) {
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
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      const err = new APIError('Patient not found', httpStatus.NOT_FOUND, true);
      return next(err);
    }
    if (req.body.hasRefrigerator) {
      patient.hasRefrigerator = req.body.hasRefrigerator;
    }
    if (req.body.hasElectricity) {
      patient.hasElectricity = req.body.hasElectricity;
    }
    if (req.body.hasPet) {
      patient.hasPet = req.body.hasPet;
    }
    if (req.body.insurance) {
      patient.insurance = req.body.insurance;
    }
    if (req.body.heatingType) {
      patient.heatingType = req.body.heatingType;
    }
    if (req.body.houseType) {
      patient.houseType = req.body.houseType;
    }
    if (req.body.waterType) {
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
    const patient = await Patient.findById(req.params.patientId).populate({
      path: 'clinicalRecords',
      match: { deleted: { $eq: false } },
      populate: { path: 'user', model: 'User', select: 'username' }
    });
    if (!patient || patient.deleted) {
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
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      const err = new APIError('Patient not found', httpStatus.NOT_FOUND, true);
      return next(err);
    }
    patient.deleted = true;
    patient
      .save()
      .then(savedPatient => res.send())
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
    let patient = await Patient.findById(req.params.patientId);
    const cutoff = new Date(patient.birthday);
    cutoff.setDate(cutoff.getDate() + 98);
    patient = await patient
      .populate({
        path: 'clinicalRecords',
        match: { deleted: { $eq: false }, controlDate: { $lt: cutoff } }
      })
      .execPopulate();
    if (!patient) {
      const err = new APIError('Patient not found', httpStatus.NOT_FOUND, true);
      return next(err);
    }
    let weeks = new Array(14).fill(null);
    weeks = weeks.map((element, index) => {
      const max = new Date(patient.birthday);
      max.setDate(max.getDate() + 7 * (index + 1));
      const min = new Date(patient.birthday);
      min.setDate(min.getDate() + 7 * index);
      const records = patient.clinicalRecords.filter(
        r =>
          r.ppc &&
          (new Date(r.controlDate) < max && new Date(r.controlDate) >= min)
      );
      const makeSelect = comparator => (a, b) =>
        comparator(a, b) ? a.ppc : b.ppc;
      const maxByValue = makeSelect(
        (a, b) => new Date(a.controlDate) >= new Date(b.controlDate)
      );
      return records.length === 0 ? null : records.reduce(maxByValue, {});
    });
    return res.json({ ppc: weeks });
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
