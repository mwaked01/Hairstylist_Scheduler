const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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
    notes: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});



const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = {
    Appointment,
    appointmentSchema
};
