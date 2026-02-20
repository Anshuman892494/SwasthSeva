import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../components/DashboardLayout';
import { toast } from 'react-toastify';
import { CheckIcon, XMarkIcon, ClockIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'; // Updated icons

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();

        const interval = setInterval(() => {
            fetchAppointments();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await api.get('/appointments');
            setAppointments(response.data);
        } catch (error) {
            toast.error('Failed to fetch appointments');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/appointments/${id}`, { status });
            toast.success(`Appointment ${status}`);
            fetchAppointments();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-amber-100 text-amber-700 border-amber-200';
        }
    };

    // Group appointments by status for simple stats
    const pendingCount = appointments.filter(a => a.status === 'pending').length;
    const approvedCount = appointments.filter(a => a.status === 'approved').length;

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Summary Cards */}
                <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white rounded-3xl p-6 shadow-card flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                            <ClockIcon className="h-7 w-7" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                            <p className="text-sm text-gray-500">Pending Requests</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-card flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <CheckIcon className="h-7 w-7" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
                            <p className="text-sm text-gray-500">Scheduled Visits</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-card flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <span className="text-xl font-bold">{appointments.length}</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">Total</p>
                            <p className="text-sm text-gray-500">Total Appointments</p>
                        </div>
                    </div>
                </div>

                {/* Appointments Table Card */}
                <div className="lg:col-span-4 bg-white rounded-3xl shadow-card overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900">Appointment Requests</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Patient Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date & Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Department</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {appointments.map((apt) => (
                                    <tr key={apt._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{apt.patientName}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {apt.date} <br /> <span className="text-xs text-gray-400">{apt.timeSlot}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">{apt.department}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStatusStyle(apt.status)}`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {apt.status === 'pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(apt._id, 'approved')}
                                                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                                                        title="Approve"
                                                    >
                                                        <CheckIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(apt._id, 'rejected')}
                                                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                                                        title="Reject"
                                                    >
                                                        <XMarkIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ) : apt.status === 'approved' ? (
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handleStatusUpdate(apt._id, 'completed')}
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-xs font-medium border border-blue-200"
                                                        title="Mark as Completed"
                                                    >
                                                        <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                                        Complete
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">No actions</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {appointments.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-gray-500">No appointments found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default DoctorDashboard;
