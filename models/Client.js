// models/Client.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  patronymic: String,
  birthDate: {
    type: Date,
    required: true
  },
  INN: {
    type: String,
    required: true
  },
  responsiblePerson: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Не в работе'
  }
});

module.exports = mongoose.model('Client', clientSchema);
