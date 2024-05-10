const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  StartTime: {
    type: String,
    required: true,
  },
  EndTime: {
    type: String,
    required: true,
  },
}, { collection: 'Period' });

const Period = mongoose.model('Period', periodSchema);

module.exports = Period;
