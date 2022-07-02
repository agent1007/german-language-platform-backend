const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  questions: {
    type: Array,
    default: [{
      titleQue: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
      },
      variants: {
        type: Array,
        default: [{
          titleVar: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100,
          },
          idVar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
          },
        }],
      },
      idQue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      }
    }],
  },
});

module.exports = mongoose.model('questions', questionsSchema);