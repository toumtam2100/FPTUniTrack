const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  SubjectID: {
    type: Number,
    required: true,
    unique: true,
  },
  SubjectCode: {
    type: String,
    required: true,
  },
  SyllabusName: {
    type: String,
    required: true,
  },
  Score: [
    {
      scoreName: {
        type: String,
        required: true,
      },
      percentage: {
        type: String,
        required: true,
      },
    },
  ],
  PREQUISITE: {
    type: String,
  },
  IsActive: {
    type: Boolean,
    default: true,
  },
}, { collection: 'Subject' });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
