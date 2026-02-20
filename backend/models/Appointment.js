const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
    {
        department: {
            type: String,
            required: [true, 'Please select a department'],
        },
        doctorName: {
            type: String,
            required: [true, 'Please select a doctor'],
        },
        patientName: {
            type: String,
            required: true,
        },
        patientId: { // Keeping reference for ownership
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        date: {
            type: String,
            required: [true, 'Please select a date'],
        },
        timeSlot: {
            type: String,
            required: [true, 'Please select a time slot'],
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'completed'],
            default: 'pending',
        },
        diagnosis: {
            type: String,
        },
        medications: {
            type: String,
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
