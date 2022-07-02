const mongoose = require('mongoose');
const validator = require('validator');

const resultatsSchema = new mongoose.Schema({
  nameTest: {
    type: String,
    required: true,
  },
  nameUser: {
    type: String,
    required: true,
  },
  resultat: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('resultats', resultatsSchema);