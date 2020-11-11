const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    studentId: String,
    firstName: String,
    lastName: String,
    middleName: String,
    email: String,
    phone: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);