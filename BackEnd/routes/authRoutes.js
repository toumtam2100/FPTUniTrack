const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login/student', authController.studentLogin);
router.post('/login/lecturer', authController.lecturerLogin);
router.post('/login/admin', authController.adminLogin);
router.post('/logout', authController.logout);
router.post('/logoutAll', authController.logoutAll)
router.post('/login', authController.login)

module.exports = router;
