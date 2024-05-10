const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true,
  },
  Gender: {
    type: Boolean,
    required: true,
  },
  IDCard: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  StudentUsername: {
    type: String,
    required: true,
  },
  Specialization: {
    type: String,
    required: true,
  },
  IsActive: {
    type: Boolean,
    required: true,
  },
  Fullname: {
    type: String,
    required: true,
  },
}, { collection: 'Student' });

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
