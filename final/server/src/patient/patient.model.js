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
  clinicalRecords: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'ClinicalRecord' }
  ],
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

PatientSchema.method({
  getPpcReport() {
    return this.getReport('ppc', 7, 14);
  },
  getWeightReport() {
    return this.getReport('weight', 7, 14);
  },
  getHeightReport() {
    return this.getReport('height', 30, 25);
  },
  getReport(field, days, amount) {
    const cutoff = new Date(this.birthday);
    cutoff.setDate(cutoff.getDate() + days * amount);
    const clinicalRecords = this.clinicalRecords.filter(
      r => r[field] && new Date(r.controlDate) <= cutoff
    );
    let array = new Array(amount).fill(null);
    array = array.map((element, index) => {
      const max = new Date(this.birthday);
      max.setDate(max.getDate() + days * (index + 1));
      const min = new Date(this.birthday);
      min.setDate(min.getDate() + days * index);
      const records = clinicalRecords.filter(
        r => new Date(r.controlDate) < max && new Date(r.controlDate) >= min
      );
      const makeSelect = comparator => (a, b) =>
        comparator(a, b) ? a[field] : b[field];
      const maxByValue = makeSelect(
        (a, b) => new Date(a.controlDate) >= new Date(b.controlDate)
      );
      return records.length === 0 ? null : records.reduce(maxByValue, {});
    });
    return array;
  }
});

PatientSchema.statics = {};

module.exports = mongoose.model('Patient', PatientSchema);
