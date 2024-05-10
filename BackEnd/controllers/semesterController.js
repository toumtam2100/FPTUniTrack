const Semester = require('../Models/semesterModel');
const mongoose = require('mongoose'); // Import the mongoose library
const getAllSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find();
    res.status(200).json(semesters);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createSemester = async (req, res) => {
  try {
    const semester = new Semester(req.body);
    await semester.save();
    res.status(201).json(semester);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findOne({ SemesterID: req.params.id });
    if (!semester) {
      return res.status(404).json({ error: 'Semester not found' });
    }
    res.status(200).json(semester);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateSemester = async (req, res) => {
  try {
    const semester = await Semester.findOneAndUpdate({ SemesterID: req.params.id }, req.body, { new: true });

    if (!semester) {
      return res.status(404).json({ error: 'Semester not found' });
    }

    res.status(200).json(semester);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteSemester = async (req, res) => {
  try {
    const semester = await Semester.findOneAndDelete({ SemesterID: req.params.id });

    if (!semester) {
      return res.status(404).json({ error: 'Semester not found' });
    }

    res.status(204).send(); // Respond with a 204 status code for a successful deletion
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllSemesters,
  createSemester,
  getSemesterById,
  updateSemester,
  deleteSemester,
};
