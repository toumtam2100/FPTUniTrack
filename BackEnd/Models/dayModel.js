const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  DayID: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
}, { collection: 'Day' });

const Day = mongoose.model('Day', daySchema);

module.exports = Day;
