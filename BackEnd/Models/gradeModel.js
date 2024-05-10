const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  scoreName: String,
  grade: String,
});

// Define the schema for the StudentGrades model
const studentGradesSchema = new mongoose.Schema({
  StudentID: String,
  SubjectID: Number,
  Score: [scoreSchema],
});

// Define the schema for the Grade model
const gradeSchema = new mongoose.Schema({
  ClassID: String,
  StudentGrades: [studentGradesSchema],
},  { collection: 'Grade' });

// Create the Grade model
const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
