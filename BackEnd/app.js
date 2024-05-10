// Load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const lecturerRoutes = require('./routes/lecturerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerRoute = require('./routes/swaggerRoute');
const semesterRoutes = require('./routes/semesterRoutes');
const notificationRoutes = require('./routes/notificationRoutes')
const app = express();
const cors = require('cors');
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error: ' + err);
  });

// Routes
app.use('/auth', authRoutes);
app.use('/student', studentRoutes);
app.use('/lecturer', lecturerRoutes);
app.use('/admin', adminRoutes);
app.use('/semester', semesterRoutes);
app.use('/notification', notificationRoutes);
app.use('/', swaggerRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);

  if (err) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
