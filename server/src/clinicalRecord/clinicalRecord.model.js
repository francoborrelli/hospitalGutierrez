const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

// TODO: relaciones con paciente y usuario
const ClinicalRecordSchema = new mongoose.Schema({
  controlDate: {
    type: Date,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  hieght: {
    type: Number
  },
  pc: {
    type: Number
  },
  ppc: {
    type: Number
  },
  vaccination: {
    type: Boolean,
    required: true
  },
  maturation: {
    type: Boolean,
    required: true
  },
  fisicTest: {
    type: Boolean,
    required: true
  },
  vaccinationObservation: {
    type: String
  },
  maturationObservation: {
    type: String
  },
  fisicTestObservation: {
    type: String
  },
  generalObservation: {
    type: String
  },
  nutrition: {
    type: String
  },
  deleted: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

ClinicalRecordSchema.method({});

ClinicalRecordSchema.statics = {};

module.exports = mongoose.model('ClinicalRecord', ClinicalRecordSchema);
