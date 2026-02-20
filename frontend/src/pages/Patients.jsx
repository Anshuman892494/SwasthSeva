
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import api from '../api/axios';
import { toast } from 'react-toastify';
import {
    UserCircleIcon,
    CalendarIcon,
    ClockIcon,
    PencilSquareIcon,
    XMarkIcon,
    ClipboardDocumentListIcon,
    BeakerIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

const Patients = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [medicalDetails, setMedicalDetails] = useState({
        diagnosis: '',
        medications: '',
        notes: ''
    });

    useEffect(() => {
        fetchPatients();

        const interval = setInterval(() => {
            fetchPatients();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await api.get('/appointments');
            setAppointments(response.data);
        } catch (error) {
            toast.error('Failed to fetch patients');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (appointment) => {
        setSelectedAppointment(appointment);
        setMedicalDetails({
            diagnosis: appointment.diagnosis || '',
            medications: appointment.medications || '',
            notes: appointment.notes || ''
        });
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/appointments/${selectedAppointment._id}/medical-details`, medicalDetails);
            toast.success('Medical details updated successfully');
            setShowModal(false);
            fetchPatients(); // Refresh list to show updated data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update details');
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Patients</h1>

                {appointments.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                        <UserCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No patients found</h3>
                        <p className="mt-1 text-sm text-gray-500">You haven't been assigned any patients yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appointments.map((appointment) => (
                            <div key={appointment._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-lg">
                                                {appointment.patientName?.charAt(0).toUpperCase() || 'P'}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h3>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                    ${appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        appointment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleEditClick(appointment)}
                                            className="text-gray-400 hover:text-brand-600 transition-colors"
                                            title="Edit Medical Details"
                                        >
                                            <PencilSquareIcon className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-3 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <CalendarIcon className="h-4 w-4 mr-2" />
                                            {appointment.date}
                                        </div>
                                        <div className="flex items-center">
                                            <ClockIcon className="h-4 w-4 mr-2" />
                                            {appointment.timeSlot}
                                        </div>
                                    </div>

                                    {(appointment.diagnosis || appointment.medications || appointment.notes) && (
                                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                                            {appointment.diagnosis && (
                                                <div>
                                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Diagnosis</span>
                                                    <p className="text-sm text-gray-900">{appointment.diagnosis}</p>
                                                </div>
                                            )}
                                            {appointment.medications && (
                                                <div>
                                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Medications</span>
                                                    <p className="text-sm text-gray-900 truncate">{appointment.medications}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                                    {appointment.status === 'completed' ? (
                                        <div className="w-full text-center py-1">
                                            <span className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500">
                                                <ClipboardDocumentListIcon className="h-4 w-4" />
                                                Consultation Completed
                                            </span>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleEditClick(appointment)}
                                            className="text-sm font-medium text-brand-600 hover:text-brand-700 w-full text-center flex items-center justify-center gap-2"
                                        >
                                            <PencilSquareIcon className="h-4 w-4" />
                                            {appointment.diagnosis ? 'Update Medical Details' : 'Add Medical Details'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Medical Details Modal - Simplified Structure */}
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/60 transition-opacity"
                            onClick={() => setShowModal(false)}
                        ></div>

                        {/* Modal Panel */}
                        <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10 flex flex-col">
                            <form onSubmit={handleSave}>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6" id="modal-title">
                                        Medical Details for {selectedAppointment?.patientName}
                                    </h3>

                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="diagnosis" className="block text-sm font-bold text-gray-700 mb-1.5">Diagnosis</label>
                                            <input
                                                type="text"
                                                name="diagnosis"
                                                id="diagnosis"
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2.5"
                                                value={medicalDetails.diagnosis}
                                                onChange={(e) => setMedicalDetails({ ...medicalDetails, diagnosis: e.target.value })}
                                                placeholder="e.g. Viral Fever"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="medications" className="block text-sm font-bold text-gray-700 mb-1.5">Prescribed Medications</label>
                                            <textarea
                                                name="medications"
                                                id="medications"
                                                rows={3}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                                                value={medicalDetails.medications}
                                                onChange={(e) => setMedicalDetails({ ...medicalDetails, medications: e.target.value })}
                                                placeholder="e.g. Paracetamol 500mg"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="notes" className="block text-sm font-bold text-gray-700 mb-1.5">Additional Notes</label>
                                            <textarea
                                                name="notes"
                                                id="notes"
                                                rows={3}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                                                value={medicalDetails.notes}
                                                onChange={(e) => setMedicalDetails({ ...medicalDetails, notes: e.target.value })}
                                                placeholder="Any other observations..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse gap-3 rounded-b-xl border-t border-gray-100">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-brand-600 text-base font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:text-sm transition-colors"
                                    >
                                        Save Details
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:text-sm transition-colors"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Patients;
