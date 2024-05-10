const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  ClassID: {
    type: String,
    required: true,
  },
  SubjectID: {
    type: Number,
    required: true,
  },
  StudentID: {
    type: [String],
    required: true,
  },
  RoomCode: {
    type: String,
    required: true,
  },
  SemesterID: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  StartTime: {
    type: Date,
    required: true,
  },
  EndTime: {
    type: Date,
    required: true,
  },
}, { collection: 'Class' });

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
