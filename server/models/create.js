const mongoose = require('mongoose');

// Defining the  Employee Schema
const CreateEmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    designation: { type: String, required: true, enum: ['HR', 'Manager', 'Sales'] },
    gender: { type: String, required: true, enum: ['M', 'F'] },
    course: { type: [String], required: true },
    image: { type: String, required: false }, 
}, {
    timestamps: true 
});

const CreateEmployeeModel = mongoose.model('EmployeeList', CreateEmployeeSchema);
module.exports = CreateEmployeeModel;
