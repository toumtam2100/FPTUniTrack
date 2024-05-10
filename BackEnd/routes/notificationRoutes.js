const express = require('express');
const notificationController = require('../controllers/notificationController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get all announcements
router.get('/getAllNotifications', verifyToken, notificationController.getAllNotifications);
router.get('/notificationDetail/:id', verifyToken, notificationController.viewNotificationDetail);
// Admin-only routes
router.post('/addNotification', verifyToken, notificationController.createNotification);
router.put('/updateNotification/:id/detail', verifyToken, notificationController.updateNotification);
router.delete('/deleteNotification/:id', verifyToken, notificationController.deleteNotification);

module.exports = router;
