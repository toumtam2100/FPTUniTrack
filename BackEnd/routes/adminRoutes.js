const express = require('express');
const adminController = require('../controllers/adminController');
const subjectController = require('../controllers/subjectController');
const notificationController = require('../controllers/notificationController');
const verifyToken = require('../middlewares/authMiddleware');
const verifyAdmin = require('../middlewares/authMiddleware');
const router = express.Router();

// Protected route for admin's profile
router.get('/profile/:id', verifyToken, adminController.adminProfile);
// Route to get all students' information
router.post('/getAllStudents', verifyToken, adminController.getAllStudents);

router.post('/student/profile/:id', verifyToken, adminController.viewStudentProfile);

router.put('/updateStudent/:id/profile', verifyToken, adminController.updateStudentProfile);

router.delete('/deleteStudent/:id', verifyToken, adminController.deleteStudent);
//Router.post
router.post('/addStudent', verifyToken, adminController.addStudent);
//Router.post
router.post('/getAllLecturers', verifyToken, adminController.getAllLecturers);
router.post('/lecturer/profile/:id', verifyToken, adminController.viewLecturerProfile);
router.post('/addLecturer', verifyToken, adminController.addLecturer);
router.put('/updateLecturer/:id/profile', verifyToken, adminController.updateLecturerProfile);
router.delete('/deleteLecturer/:id', verifyToken, adminController.deleteLecturer);
// Router noti
router.get('/getAllNotifications', verifyToken, notificationController.getAllNotifications);
router.get('/notificationDetail/:id', verifyToken, notificationController.viewNotificationDetail);
router.post('/addNotification', verifyToken, notificationController.createNotification);
router.put('/updateNotification/:id/detail', verifyToken, notificationController.updateNotification);
router.delete('/deleteNotification/:id', verifyToken, notificationController.deleteNotification);

<<<<<<< HEAD
=======
//Router for subject - ADMIN with CRUD subject privillege
//Get all subjects
router.get('/getAllSubjects', verifyToken, subjectController.getAllSubjects);
//Get subject detail
router.get('/subjectDetail/:id', verifyToken, subjectController.subjectDetail);
//Edit subject detail
router.put('/subjectDetail/:id/edit', verifyToken, adminController.editSubjectDetail);
//Create subject
router.post('/subject/create', verifyToken, adminController.addSubject);
//Delete subject
router.delete('/subject/:id/delete', verifyToken, adminController.deleteSubject);
>>>>>>> vawnhuy

module.exports = router;
