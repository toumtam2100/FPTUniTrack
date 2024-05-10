const { Int32 } = require('bson');
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  PeriodID: {
    type: String,
    required: true,
  },
  DayID: {
    type: String,
    required: true,
  },
  ClassID: {
    type: String,
    required: true,
  },
  SemesterID: {
    type: String,
    required: true,
  },
  SubjectID: {
    type: Number,
    required: true
  },
  RoomCode: {
    type: String,
    required: true,
  },
  WeekNumber: {
    type: String,
    required: true,
  },
  LecturerUserName: {
    type: String,
    required: true,
  },
}, {collection: 'Slot' });

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
