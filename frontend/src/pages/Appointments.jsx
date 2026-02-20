
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await api.get('/appointments');
            setAppointments(response.data);
        } catch (error) {
            toast.error('Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved': return 'bg-emerald-100 text-emerald-800';
            case 'rejected': return 'bg-rose-100 text-rose-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-amber-100 text-amber-800';
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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
                    {/* Add "Book New" button here if needed in future */}
                </div>

                {appointments.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                        <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No appointments</h3>
                        <p className="mt-1 text-sm text-gray-500">You haven't booked any appointments yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {appointments.map((appointment) => (
                            <div key={appointment._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">{appointment.doctorName}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyle(appointment.status)}`}>
                                                {appointment.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <MapPinIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                                {appointment.department}
                                            </div>
                                            <div className="flex items-center">
                                                <CalendarIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                                {appointment.date}
                                            </div>
                                            <div className="flex items-center">
                                                <ClockIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                                {appointment.timeSlot}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Add actions like "Cancel" here if allowing patient to cancel directly from list */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Appointments;
