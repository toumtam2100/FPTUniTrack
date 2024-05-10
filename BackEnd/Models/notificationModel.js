const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true
  },
  DateTime: {
    type: Date,
    required: true,
  },
}, { collection: 'Notification' });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
