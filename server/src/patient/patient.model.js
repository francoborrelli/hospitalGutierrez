const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const PatientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  clinicalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClinicalRecord' }],
  documentNumber: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  hasRefrigerator: {
    type: Boolean,
    required: true
  },
  hasElectricity: {
    type: Boolean,
    required: true
  },
  hasPet: {
    type: Boolean,
    required: true
  },
  documentType: {
    type: Number,
    required: true
  },
  insurance: {
    type: Number
  },
  heatingType: {
    type: Number,
    required: true
  },
  houseType: {
    type: Number,
    required: true
  },
  waterType: {
    type: Number,
    required: true
  },
  deleted: {
    type: Boolean,
    required: true
  }
});

PatientSchema.method({});

PatientSchema.statics = {};

module.exports = mongoose.model('Patient', PatientSchema);
