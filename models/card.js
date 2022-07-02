const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  titleRu: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 400,
  },
  titleDeu: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 400,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      mesages: 'Неправильный формат ссылки.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
