const Admin = require('../Models/adminModel');
const Lecturer = require('../Models/lecturerModel');
const Student = require('../Models/studentModel');
const Subject = require('../Models/subjectModel');
const roles = require('../configs/roleConfig');

async function adminProfile(req, res) {
  const adminId = req.Admin.id;

  try {
    const admin = await Admin.findOne({ id: adminId, role: roles.ADMIN });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

<<<<<<< HEAD
=======
async function updateStudentProfile(req, res) {
  const studentId = req.params.id;
  const { DateOfBirth, Gender, IDCard, Address, Phone, Email,
    StudentUsername, Specialization, IsActive, Fullname } = req.body;
  console.log('User Role:', req.user.role);
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can update student profiles.' });
    }
>>>>>>> vawnhuy


async function getAllStudents(req, res) {
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can get all student profiles.' });
    }
    const students = await Student.find({});
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function viewStudentProfile(req, res) {

  try {
    // Check if the request is coming from an admin
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admins can view student profiles.' });
    }

    // Find the student with the specified ID
    const studentId = req.params.id; // Use req.params.id to get the ID from the route parameter
    const student = await Student.find({ id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function addStudent(req, res) {
  //Check user role
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can get all student profiles.' });
    }
    //Handle case duplicate ID.
    const { id } = req.body;
    console.log(id);
    const existingStudent = await Student.findOne({ id });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with the same ID already exists' });
    }
    //If ID not dupilcate, continue create new student.
    const newStudentData = req.body;
    const newStudent = new Student(newStudentData);
    await newStudent.save();
    res.json({ message: 'Student added successfully' });

  } catch (err) {

    //Error handler case.
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateStudentProfile(req, res) {
  const studentId = req.params.id;
  const { DateOfBirth, Gender, IDCard, Address, Phone, Email,
    StudentUsername, Specialization, IsActive, Fullname } = req.body;
    console.log('User Role:', req.user.role);
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can update student profiles.' });
    }

    const student = await Student.findOne({ id: studentId });

    Object.assign(student, req.body);
    // Save the updated student data
    await student.save();

    res.json({ message: 'Student profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteStudent(req, res) {
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can delete student profiles.' });
    }

    const studentId = req.params.id;2

    // Use findOneAndRemove to find and remove the student by id
    const result = await Student.findOneAndRemove({ id: studentId });

    if (!result) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // If the student exists, delete it
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

<<<<<<< HEAD
async function getAllLecturers(req, res) {
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can get all student profiles.' });
    }
    const lecturers = await Lecturer.find({});
    res.json(lecturers);
=======
async function editSubjectDetail(req, res) {
  const subjectId = req.params.id;

  try {
    // Check if the user has admin role
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admins can edit subject detail!' });
    }

    // Find the subject by ID
    const subject = await Subject.findOne({ SubjectID: subjectId });

    // Check if the subject exists
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Update subject properties based on the request body
    const { SubjectCode, SyllabusName, Score, PREQUISITE, IsActive } = req.body;
    subject.SubjectCode = SubjectCode || subject.SubjectCode;
    subject.SyllabusName = SyllabusName || subject.SyllabusName;
    subject.Score = Score || subject.Score;
    subject.PREQUISITE = PREQUISITE || subject.PREQUISITE;
    subject.IsActive = IsActive !== undefined ? IsActive : subject.IsActive;

    // Save the updated subject data
    await subject.save();

    res.json({ message: 'Subject details updated successfully' });
>>>>>>> vawnhuy
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

<<<<<<< HEAD
async function viewLecturerProfile(req, res) {
  const lecturerId = req.params.id; // Assuming the lecturer ID is passed as a route parameter

  try {
    // Check if the request is coming from an admin
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admins can view lecturer profiles.' });
    }

    // Find the lecturer with the specified ID
    const lecturer = await Lecturer.find({ id: lecturerId });

    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }

    res.json(lecturer);
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function addLecturer(req, res) {
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can get all lecturer profiles.' });
    }
    //Handle case duplicate ID.
    const {id} = req.body;
    console.log(id);
    const existingLecturer = await Lecturer.findOne({ id });
    if (existingLecturer) {
      return res.status(400).json({ message: 'Lecturer with the same ID already exists' });
    }
    //If ID not dupilcate, continue create new lecturer.
    const newLecturerData = req.body;
    const newLecturer = new Lecturer(newLecturerData);
    await newLecturer.save();
    res.json({ message: 'Lecturer added successfully' });
=======
async function addSubject(req, res) {
  //Check user role
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can create subject.' });
    }
    //Handle case duplicate ID.
    const { SubjectID } = req.body;
    console.log(SubjectID);
    const existingSubject = await Subject.findOne({ SubjectID });
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject with the same ID already exists' });
    }
    //If ID not dupilcate, continue create new student.
    const newSubjectData = req.body;
    const newSubject = new Subject(newSubjectData);
    await newSubject.save();
    res.json({ message: 'Subject added successfully' });
>>>>>>> vawnhuy

  } catch (err) {

    //Error handler case.
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

<<<<<<< HEAD
async function updateLecturerProfile(req, res) {
  const lecturerId = req.params.id;
  const { LectureUserName, DateOfBirth, Gender, IDCard, Address,
    Phone, Email, Fullname, IsActive } = req.body;
    console.log('User Role: ', req.user.role);
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can update lecturer profiles.' });
    }

    const lecturer = await Lecturer.findOne({ id: lecturerId });

    Object.assign(lecturer, req.body);
    // Save the updated lecturer data
    await lecturer.save();

    res.json({ message: 'Lecturer profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteLecturer(req, res) {
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can delete lecturer profiles.' });
    }

    const lecturerId = req.params.id;

    // Use findOneAndRemove to find and remove the lecturer by id
    const result = await Lecturer.findOneAndRemove({ id: lecturerId });

    if (!result) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }

    // If the lecturer exists, delete it
    res.json({ message: 'Lecturer deleted successfully' });
=======
async function deleteSubject(req, res) {
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can delete subject.' });
    }

    const subjectId = req.params.id;

    // Use findOneAndRemove to find and remove the student by id
    const result = await Subject.findOneAndRemove({ SubjectID: subjectId });

    if (!result) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // If the student exists, delete it
    res.json({ message: 'Subject deleted successfully' });
>>>>>>> vawnhuy
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  adminProfile,
  getAllStudents,
  viewStudentProfile,
<<<<<<< HEAD
  addStudent,
  updateStudentProfile,
  deleteStudent,
  getAllLecturers,
  viewLecturerProfile,
  addLecturer,
  updateLecturerProfile,
  deleteLecturer,
=======
  deleteStudent,
  editSubjectDetail,
  addSubject,
  deleteSubject
>>>>>>> vawnhuy
};
