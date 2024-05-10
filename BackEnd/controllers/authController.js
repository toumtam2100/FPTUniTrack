const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/userModel');
const Lecturer = require('../Models/lecturerModel');
const Student = require('../Models/studentModel');
const Admin = require('../Models/adminModel');
const Role = require('../Models/roleModel');
const UserRole = require('../Models/userRoleModel');
// Function to generate JWT token
function generateToken(user) {
  const payload = {
    id: user.id,
    role: user.role,
    time: Date.now()
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRED });
}

// Logout current session
async function logout(req, res, next) {
  try {
    const { id } = req.body;
    const tokenToLogout = req.header('Authorization');

    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.accessToken = user.accessToken.filter((tokenInfo) => tokenInfo.token !== tokenToLogout);

    await user.save();

    res.json("Logout Success");
  } catch (error) {
    next(error); // Pass the error to the next middleware or error handler
  }
}

// Logout all devices
async function logoutAll(req, res, next) {
  try {
    const { id } = req.body;

    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.accessToken = [];

    await user.save();

    res.json("All Tokens Logged Out Successfully");
  } catch (error) {
    next(error); // Pass the error to the next middleware or error handler
  }
}

// Student Login
async function studentLogin(req, res, next) {
  const { id, password } = req.body;
  try {
    const user = await User.findOne({ id, role: 'student' });
    if (!user) {
      return res.status(401).json({ message: 'Not found student' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      user.accessToken = user.accessToken.concat({ token });
      await user.save();
      const student = await Student.findOne({ id });
      return res.json({ student, token });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (err) {
    next(err); // Pass the error to the next middleware or error handler
  }
}

// Lecturer login
async function lecturerLogin(req, res, next) {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({ id, role: 'lecturer' });
    if (!user) {
      return res.status(401).json({ message: 'Not found lecturer' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      user.accessToken = user.accessToken.concat({ token });
      await user.save();
      const lecturer = await Lecturer.findOne({ id });
      return res.json({ lecturer, token });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (err) {
    next(err); // Pass the error to the next middleware or error handler
  }
}

// Admin login
async function adminLogin(req, res, next) {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({ id, role: 'admin' });
    if (!user) {
      return res.status(401).json({ message: 'Not found admin' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      user.accessToken = user.accessToken.concat({ token });
      await user.save();
      const admin = await Admin.findOne({ id });
      return res.json({ admin, token });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (err) {
    next(err); // Pass the error to the next middleware or error handler
  }
}

async function login(req, res, next) {
  const { id, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Find the user's role
    const userRole = await UserRole.findOne({ Username: id });

    if (!userRole) {
      return res.status(401).json({ error: 'Something error, contact admin' });
    }

    // Find the role name
    const role = await Role.findOne({ RoleID: userRole.RoleID });

    if (!role) {
      return res.status(401).json({ error: 'Something error, contact admin' });
    }

    const token = generateToken(user);
    user.accessToken = user.accessToken.concat({ token });
    await user.save();

    let userData;

    switch (role.RoleName) {
      case 'Admin':
        userData = await Admin.findOne({ id });
        break;
      case 'Lecturer':
        userData = await Lecturer.findOne({ id });
        break;
      case 'Student':
        userData = await Student.findOne({ id });
        break;
      default:
        return res.status(401).json({ error: 'Invalid role' });
    }

    if (userData) {
      return res.json({ user: userData, role: role.RoleName, token });
    } else {
      return res.status(404).json({ error: `${role.RoleName} not found` });
    }
  } catch (error) {
    next(error);
  }
}



module.exports = {
  studentLogin,
  lecturerLogin,
  adminLogin,
  logout,
  logoutAll,
  login
};
