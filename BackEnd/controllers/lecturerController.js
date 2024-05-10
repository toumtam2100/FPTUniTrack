const Student = require('../Models/studentModel.js');
const Class = require('../Models/classModel.js');
const Slot = require('../Models/slotModel.js');
const Period = require('../Models/periodModel.js');
const Day = require('../Models/dayModel.js');
const Semester = require('../Models/semesterModel.js');
const Subject = require('../Models/subjectModel.js');
const Grade = require('../Models/gradeModel.js')

async function lecturerProfile(req, res) {

  const lecturerId = req.user.id;
  try {
    const lecturer = await Lecturer.findOne({ id: lecturerId, role: 'Lecturer' });

    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }

    res.json(lecturer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getSlotsByWeekNumber(req, res) {
  const lecturerId = req.body.id;

  try {
    const slots = await Slot.find({
      LecturerUserName: lecturerId,
    });

    const [periods, days, semesters, subjects] = await Promise.all([
      Period.find({}),
      Day.find({ DayID: { $in: slots.map((slot) => slot.DayID) } }),
      Semester.find({ SemesterID: { $in: slots.map((slot) => slot.SemesterID) } }),
      Subject.find({ SubjectID: { $in: slots.map((slot) => slot.SubjectID) } }),
    ]);

    const slotsWithModels = slots.map((slot) => ({
      ...slot.toObject(),
      Period: periods.find((period) => period.ID == slot.PeriodID),
      Day: days.find((day) => day.DayID == slot.DayID),
      Semester: semesters.find((semester) => semester.SemesterID == slot.SemesterID),
      Subject: subjects.find((subject) => subject.SubjectID == slot.SubjectID),
    }));

    res.json(slotsWithModels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getGradeByClass(req, res, next) {
  try {
    const { classID } = req.body;

    const result = await Grade.find({
      ClassID: classID
    });
    if (!result) {
      return null;
    }
    res.json(result);

  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getGradeByStudentId(req, res, next) {
  try {
    const { studentId, subjectId } = req.body;

    const result = await Grade.findOne({
      "StudentGrades.StudentID": studentId,
      "StudentGrades.SubjectID": subjectId
    });
    if (!result) {
      return null;
    }
    const matchingStudentGrade = result.StudentGrades.find(
      (studentGrade) =>
        studentGrade.StudentID === studentId &&
        studentGrade.SubjectID === subjectId
    );

    if (!matchingStudentGrade) {
      return null; // No matching StudentGrades element found
    }

    const scores = matchingStudentGrade.Score;

    res.json(scores);

  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function updateStudentGrade(req, res) {
  try {
    const studentId = req.params.studentId;
    const subjectId = req.params.subjectId;
    const scoreName = req.params.scoreName;
    const newGrade = req.body.grade;

    const grade = await Grade.findOne({
      'StudentGrades.StudentID': studentId,
      'StudentGrades.SubjectID': subjectId,
    });

    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    // Find the student's grade for the specified subject
    const studentGrade = grade.StudentGrades.find((student) => {
      return student.StudentID === studentId && student.SubjectID === subjectId;
    });

    if (!studentGrade) {
      return res.status(404).json({ message: 'Student grade not found' });
    }

    // Update the student's score for the specified scoreName
    const scoreToUpdate = studentGrade.Score.find((score) => score.scoreName === scoreName);
    if (scoreToUpdate) {
      scoreToUpdate.grade = newGrade; // Update the grade
    } else {
      // If the specified scoreName doesn't exist, you can add it
      studentGrade.Score.push({ scoreName, grade: newGrade });
    }

    // Save the updated grade
    await grade.save();

    res.json({ message: 'Student score updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getStudentClasses(req, res, next) {
  const studentId = req.body.id;
  try {
    const classes = await Class.find({ StudentID: { $in: [studentId] } });
    const subjectIds = classes.map((cls) => cls.SubjectID);
    const subjects = await Subject.find({ SubjectID: { $in: subjectIds } });

    const classWithSubjects = classes.map((cls) => {
      const subject = subjects.find((subj) => subj.SubjectID === cls.SubjectID);
      return {
        ...cls.toObject(),
        ClassID: cls.ClassID,
        SubjectCode: subject.SubjectCode || null,
        SyllabusName: subject.SyllabusName || null // Attach the subject to the class
      };
    });

    res.json(classWithSubjects);
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the next middleware or error handler
  }
}

async function getAllStudentInClassBySubjectId(req, res, next) {
  const { classId, subjectId } = req.body;
  try {
    const classes = await Class.find({ ClassID: { $in: [classId] }, SubjectID: { $in: [subjectId] } });
    const classWithSubjects = classes.map((cls) => {
      return {
        ClassID: cls.ClassID,
        SubjectID: cls.SubjectID,
        StudentID: cls.StudentID
      };
    });

    res.json(classWithSubjects);
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the next middleware or error handler
  }
}

async function getAllClassId(req, res, next) {
  try {
    const classes = await Class.find({});
    res.json(classes);
  } catch (err) {
    console.error(error);
    next(error);
  }
}

async function getAllSubjectByClassId(req, res, next) {
  try {
    const classId = req.body.classId;
    console.log(classId)
    const classes = await Class.find({ ClassID: classId });
    console.log(classes)
    const subjectIds = classes.map((cls) => cls.SubjectID);
    const subjects = await Subject.find({ SubjectID: { $in: subjectIds } });

    const classWithSubjects = classes.map((cls) => {
      const subject = subjects.find((subj) => subj.SubjectID === cls.SubjectID);
      return {
        SubjectID: subject?.SubjectID || null,
        SubjectCode: subject?.SubjectCode || null,
        SyllabusName: subject?.SyllabusName || null, // Attach the subject to the class
      };
    });

    res.json(classWithSubjects);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getGradeByClassIdAndSubjectId(req, res, next) {
  try {
    const classId = req.body.classId;
    const subjectId = req.body.subjectId;
    const result = await Grade.find({
      ClassID: classId,
      "StudentGrades.SubjectID": subjectId,
    });
    const studentGrades = result?.[0]?.StudentGrades || [];

    // Fetch student names based on StudentID
    const students = await Promise.all(
      studentGrades.map(async (grade) => {
        const studentId = grade.StudentID;
        const student = await Student.findOne({ id: studentId });
        return {
          StudentName: student?.Fullname || null,
          ...grade.toObject(),
        };
      })
    );
    res.json(students);

  } catch (error) {
    console.error(error);
    next(error);
  }
}


module.exports = {
  lecturerProfile,
  getSlotsByWeekNumber,
  getGradeByClass,
  getGradeByStudentId,
  updateStudentGrade,
  getStudentClasses,
  getAllStudentInClassBySubjectId,
  getAllClassId,
  getAllSubjectByClassId,
  getGradeByClassIdAndSubjectId
};
