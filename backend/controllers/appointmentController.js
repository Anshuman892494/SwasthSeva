const Appointment = require('../models/Appointment');
const User = require('../models/User');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private (Patient)
const bookAppointment = async (req, res) => {
    const { department, doctorName, date, timeSlot } = req.body;

    if (!department || !doctorName || !date || !timeSlot) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const appointment = await Appointment.create({
        department,
        doctorName,
        patientName: req.user.name,
        patientId: req.user.id, // From auth middleware
        date,
        timeSlot,
        status: 'pending',
    });

    res.status(201).json(appointment);
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private (Patient & Doctor)
const getAppointments = async (req, res) => {
    let appointments;

    if (req.user.role === 'patient') {
        // Patient sees their own appointments
        appointments = await Appointment.find({ patientId: req.user.id });
    } else if (req.user.role === 'doctor') {
        appointments = await Appointment.find({ doctorName: req.user.name });
    } else {
        return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json(appointments);
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Doctor)
const updateAppointmentStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    if (!['approved', 'rejected', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    // Ensure the doctor owns this appointment
    if (appointment.doctorName !== req.user.name) {
        return res.status(401).json({ message: 'Not authorized to update this appointment' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json(appointment);
};

// @desc    Cancel an appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private (Patient)
const cancelAppointment = async (req, res) => {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    // Ensure the patient owns this appointment
    if (appointment.patientId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to cancel this appointment' });
    }

    if (appointment.status === 'cancelled') {
        return res.status(400).json({ message: 'Appointment is already cancelled' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json(appointment);
};

// @desc    Update medical details (diagnosis, meds, notes)
// @route   PUT /api/appointments/:id/medical-details
// @access  Private (Doctor)
const updateMedicalDetails = async (req, res) => {
    const { diagnosis, medications, notes } = req.body;
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    // Ensure the doctor owns this appointment
    if (appointment.doctorName !== req.user.name) {
        return res.status(401).json({ message: 'Not authorized to update this appointment' });
    }

    appointment.diagnosis = diagnosis || appointment.diagnosis;
    appointment.medications = medications || appointment.medications;
    appointment.notes = notes || appointment.notes;

    await appointment.save();

    res.status(200).json(appointment);
};

module.exports = {
    bookAppointment,
    getAppointments,
    updateAppointmentStatus,
    cancelAppointment,
    updateMedicalDetails,
};
