const { model, Schema } = require('mongoose');

const employeeSchema = new Schema({
    name: String,
    age: Number,
    level: String,
    subjects: Array,
    attendance: String
}, {
    timestamps: true
});

module.exports = model('Employee', employeeSchema);