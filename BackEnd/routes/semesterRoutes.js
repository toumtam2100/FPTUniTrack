const express = require('express');
const semesterController = require('../controllers/semesterController'); // Replace with the correct path to your semester controller
const verifyToken = require('../middlewares/authMiddleware'); // Replace with the appropriate middleware

const router = express.Router();

// Define your semester routes here
router.get('/', semesterController.getAllSemesters);
router.post('/', semesterController.createSemester);
router.get('/:id', semesterController.getSemesterById);
router.put('/:id', semesterController.updateSemester);
router.delete('/:id', semesterController.deleteSemester);

module.exports = router;


