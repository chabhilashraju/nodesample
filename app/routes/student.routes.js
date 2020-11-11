module.exports = (app) => {
    const students = require('../controllers/student.controller.js');

    // Create a new Student
    app.post('/student', students.create);

    // Retrieve all Students
    app.get('/students', students.findAll);

    // Retrieve a single Student with StudentId
    app.get('/students/:studentId', students.findOne);

    // Update a Student with StudentId
    app.put('/students/:studentId', students.update);

    // Delete a Student with StudentId
    app.delete('/students/:studentId', students.delete);
}