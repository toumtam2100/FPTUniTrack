const Notification = require('../Models/notificationModel');
const roles = require('../configs/roleConfig');

async function getAllNotifications(req, res, next) {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function viewNotificationDetail(req, res) {

  try {
    // Find the notification with the specified ID
    const notificationId = req.params.id; // Use req.params.id to get the ID from the route parameter
    const notification = await Notification.find({ id: notificationId });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function createNotification(req, res, next) {
    try {
      // Check if the user has admin privileges (you need to implement this middleware)
      if (req.body.role !== roles.ADMIN) {
        return res.status(403).json({ message: 'Permission denied. Only admin Admins can get all notification detail.' });
      }
  
      //Handle case duplicate ID.
    const {id} = req.body;
    console.log(id);
    const existingNotification = await Notification.findOne({ id });
    if (existingNotification) {
      return res.status(400).json({ message: 'Notification with the same ID already exists' });
    }
    //If ID not dupilcate, continue create new Notification.
    const newNotificationData = req.body;
    const newNotification = new Notification(newNotificationData);
    await newNotification.save();
    res.json({ message: 'Notification added successfully' });

  } catch (err) {

    //Error handler case.
    console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
  }

async function updateNotification(req, res, next) {
  const notificationId = req.params.id;
    console.log('User Role: ', req.user.role);
  try {
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can update notification profiles.' });
    }

    const notification = await Notification.findOne({ id: notificationId });

    Object.assign(notification, req.body);
    // Save the updated notification data
    await notification.save();

    res.json({ message: 'Notification profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteNotification(req, res, next) {
  try {
    // Check if the user has admin privileges
    if (req.body.role !== roles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied. Only admin Admins can delete notification profiles.' });
    }
    const notificationId = req.params.id;

    // Use findOneAndRemove to find and remove the notification by id
    const result = await Notification.findOneAndRemove({ id: notificationId });

    if (!result) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // If the notification exists, delete it
    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

  module.exports = {
    getAllNotifications,
    viewNotificationDetail,
    createNotification,
    updateNotification,
    deleteNotification,
  };