const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  SemesterID: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  StartDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
  },
}, { collection: 'Semester' });

const Semester = mongoose.model('Semester', semesterSchema);

module.exports = Semester;
