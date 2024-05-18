const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['booked', 'completed', 'cancelled'],
        default: 'booked',
    },
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
