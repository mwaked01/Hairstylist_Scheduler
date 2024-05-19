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

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    appointments: [appointmentSchema],
}, {
    timestamps: true,
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
