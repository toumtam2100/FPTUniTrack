const express = require('express');
const lecturerController = require('../controllers/lecturerController');
const subjectController = require('../controllers/subjectController');
const notificationController = require('../controllers/notificationController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes for lecturer's profile
router.get('/profile/:id', verifyToken, lecturerController.lecturerProfile);

// Protected route to get slots by week number
router.post('/getSlotsByWeek/', verifyToken, lecturerController.getSlotsByWeekNumber);

// Protected route to update student grade
router.put('/grade/update/:studentId/:subjectId/:scoreName', verifyToken, lecturerController.updateStudentGrade);

// Protected route to get grade by student ID
router.post('/getGradeByStudentId', verifyToken, lecturerController.getGradeByStudentId);

// Protected route to get grade by class
router.post('/getGradeByClass', verifyToken, lecturerController.getGradeByClass);

// Route to get all student in class by subject ID
router.post('/getStudentBySubjectId', verifyToken, lecturerController.getAllStudentInClassBySubjectId);

// Route to get all class IDs
router.get('/allClassIds', verifyToken, lecturerController.getAllClassId);

// Route to get all subjects by class ID
router.post('/allSubjectsByClassId', verifyToken, lecturerController.getAllSubjectByClassId);

// Route to get grades by class ID and subject ID
router.post('/gradeByClassIdAndSubjectId', verifyToken, lecturerController.getGradeByClassIdAndSubjectId);

//Routes for subject - LECTURER with READ subject privillege only
//Get all subjects
router.get('/getAllSubjects', verifyToken, subjectController.getAllSubjects);
//Get subject detail
router.get('/subjectDetail/:id', verifyToken, subjectController.subjectDetail);
//Get all noti
router.get('/getAllNotifications', verifyToken, notificationController.getAllNotifications);
router.get('/notificationDetail/:id', verifyToken, notificationController.viewNotificationDetail);

module.exports = router;
