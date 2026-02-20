const express = require('express');
const router = express.Router();
const {
    bookAppointment,
    getAppointments,
    updateAppointmentStatus,
    cancelAppointment,
    updateMedicalDetails,
} = require('../controllers/appointmentController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.route('/')
    .post(protect, authorizeRoles('patient'), bookAppointment)
    .get(protect, getAppointments);

router.route('/:id')
    .put(protect, authorizeRoles('doctor'), updateAppointmentStatus);

router.route('/:id/cancel')
    .put(protect, authorizeRoles('patient'), cancelAppointment);

router.route('/:id/medical-details')
    .put(protect, authorizeRoles('doctor'), updateMedicalDetails);

module.exports = router;
