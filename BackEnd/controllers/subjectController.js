const Subject = require('../Models/subjectModel');

// Function to get all subjects
async function getAllSubjects(req, res) {
    try {
        const subjects = await Subject.find({});
        res.json(subjects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

//Function to get subject detail
async function subjectDetail(req, res) {
    try {
        const subjectId = req.params.id;
        const subject = await Subject.find({ SubjectID: subjectId });

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found!' });
        }

        res.json(subject);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error!" });
    }
}

module.exports = {
    getAllSubjects,
    subjectDetail
};