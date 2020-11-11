const Student = require('../models/student.model.js');

// Create and Save a new Student
exports.create = (req, res) => {
console.log(req.body);

    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Create a Student
    const student = new Student({
        studentId: req.body.studentId || "Untitled Name",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        email: req.body.email,
        phone: req.body.phone
    });

    // Save Student in the database
    student.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Student."
            });
        });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    Student.find()
        .then(students => {
            res.send(students);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving students."
            });
        });
};

// Find a single Student with a studentId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
        .then(student => {
            if (!student) {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.studentId
                });
            }
            res.send(student);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.studentId
                });
            }
            return res.status(500).send({
                message: "Error retrieving student with id " + req.params.studentId
            });
        });
};

// Update a student identified by the studentId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Find student and update it with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        title: req.body.title || "Untitled Student",
        content: req.body.content
    }, { new: true })
        .then(student => {
            if (!student) {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.studentId
                });
            }
            res.send(student);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.studentId
                });
            }
            return res.status(500).send({
                message: "Error updating student with id " + req.params.studentId
            });
        });
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
        .then(student => {
            if (!student) {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.studentId
                });
            }
            res.send({ message: "Student deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.studentId
                });
            }
            return res.status(500).send({
                message: "Could not delete student with id " + req.params.studentId
            });
        });
};
