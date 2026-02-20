
import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../components/DashboardLayout';
import { toast } from 'react-toastify';
import {
    ClockIcon,
    CalendarDaysIcon,
    ArrowDownTrayIcon,
    XCircleIcon,
    PlusCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]); // All doctors
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Doctors filtered by department
    const [formData, setFormData] = useState({
        department: '',
        doctorName: '',
        date: '',
        timeSlot: '',
    });

    const departments = [
        'Cardiology',
        'Neurology',
        'Dermatology',
        'Orthopedics',
        'Pediatrics',
        'Psychiatry',
        'Gynecology',
        'Internal Medicine',
        'Oncology',
        'Pathology',
        'Gastroenterology',
        'Pulmonology',
        'Endocrinology',
        'Ophthalmology',
        'Dentistry'
    ];

    useEffect(() => {
        console.log('PatientDashboard mounted');
        fetchAppointments();
        fetchDoctors();

        // Real-time updates: Poll every 10 seconds
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
            console.error("Fetch error", error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await api.get('/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'department') {
            const selectedDept = e.target.value;
            if (selectedDept) {
                const filtered = doctors.filter(doc => doc.department === selectedDept);
                setFilteredDoctors(filtered);
            } else {
                setFilteredDoctors([]);
            }
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value, doctorName: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/appointments', formData);
            toast.success('Appointment booked successfully!');
            setFormData({ department: '', doctorName: '', date: '', timeSlot: '' });
            fetchAppointments();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Booking failed');
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

        try {
            await api.put(`/appointments/${id}/cancel`);
            toast.success('Appointment cancelled successfully');
            fetchAppointments();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Cancellation failed');
        }
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved': return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
            case 'rejected': return 'bg-rose-50 text-rose-700 ring-rose-600/20';
            case 'cancelled': return 'bg-gray-50 text-gray-600 ring-gray-500/20';
            default: return 'bg-amber-50 text-amber-700 ring-amber-600/20';
        }
    };

    // Filter appointments: Exclude completed and cancelled from "Upcoming" view
    const upcomingAppointments = appointments.filter(a =>
        new Date(a.date) >= new Date().setHours(0, 0, 0, 0) &&
        a.status !== 'cancelled' &&
        a.status !== 'completed'
    );

    // Calendar Helper
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Main Content Area (Left 2/3) */}
                <div className="xl:col-span-2 space-y-8">

                    {/* Welcome Header */}
                    <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-8 text-white shadow-xl">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back, {user.name}!</h1>
                        <p className="text-brand-100 mb-6">Here's an overview of your health schedule.</p>
                        <div className="flex gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[120px]">
                                <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
                                <p className="text-sm text-brand-100">Upcoming Visits</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[120px]">
                                <p className="text-3xl font-bold">{appointments.filter(a => a.status === 'completed').length}</p>
                                <p className="text-sm text-brand-100">Completed Visits</p>
                            </div>
                        </div>
                    </div>


                    {/* Upcoming Appointments List */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                        </div>

                        <div className="space-y-4">
                            {upcomingAppointments.length > 0 ? upcomingAppointments.map((apt) => (
                                <div key={apt._id} className="group flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-white border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-5 w-full sm:w-auto">
                                        <div className="h-16 w-16 rounded-2xl bg-brand-50 text-brand-600 flex flex-col items-center justify-center font-bold border border-brand-100 group-hover:scale-105 transition-transform">
                                            <span className="text-xs uppercase tracking-wider text-brand-400">{new Date(apt.date).toLocaleString('default', { month: 'short' })}</span>
                                            <span className="text-2xl">{new Date(apt.date).getDate()}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{apt.doctorName}</h3>
                                            <p className="text-sm text-gray-500 font-medium">{apt.department}</p>
                                            <div className="flex items-center gap-2 mt-1.5 text-xs font-semibold text-gray-400">
                                                <ClockIcon className="h-3.5 w-3.5" /> {apt.timeSlot}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                                        <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${getStatusStyle(apt.status)} capitalize`}>
                                            {apt.status}
                                        </span>
                                        {apt.status === 'pending' && (
                                            <button
                                                onClick={() => handleCancel(apt._id)}
                                                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                                                title="Cancel Appointment"
                                            >
                                                <XCircleIcon className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                                    <CalendarDaysIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 font-medium">No upcoming appointments</p>
                                    <p className="text-sm text-gray-400">Book a new appointment to get started.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar (Calendar & Quick Book) */}
                <div className="space-y-8">

                    {/* Calendar Widget */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">{currentMonth} {today.getFullYear()}</h3>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-400 font-bold uppercase tracking-wider">
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <div key={d}>{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map(day => {
                                const hasApt = appointments.find(a =>
                                    new Date(a.date).getDate() === day &&
                                    new Date(a.date).getMonth() === today.getMonth() &&
                                    a.status !== 'cancelled' &&
                                    a.status !== 'completed'
                                );
                                const isToday = day === today.getDate();

                                return (
                                    <div
                                        key={day}
                                        className={`
                                            aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all text-sm font-medium
                                            ${isToday ? 'bg-brand-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'}
                                            ${hasApt ? 'font-bold' : ''}
                                        `}
                                    >
                                        <span>{day}</span>
                                        {hasApt && <div className={`h-1.5 w-1.5 rounded-full mt-0.5 ${isToday ? 'bg-white' : 'bg-brand-500'}`}></div>}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Schedule</h4>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                {/* Department Select */}
                                <div>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-brand-500/20 appearance-none cursor-pointer hover:bg-gray-100 transition font-medium"
                                        required
                                    >
                                        <option value="" className="text-gray-400">Select Department</option>
                                        {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>

                                {/* Doctor Select (Dependent) */}
                                <div>
                                    <select
                                        name="doctorName"
                                        value={formData.doctorName}
                                        onChange={handleChange}
                                        className={`w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-brand-500/20 appearance-none cursor-pointer hover:bg-gray-100 transition font-medium ${!formData.department ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        required
                                        disabled={!formData.department}
                                    >
                                        <option value="" className="text-gray-400">
                                            {formData.department ? 'Select Doctor' : 'Select Department First'}
                                        </option>
                                        {filteredDoctors.map((doc) => (
                                            <option key={doc._id} value={doc.name}>{doc.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        // Date is disable
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border-0 rounded-xl px-3 py-3 text-xs text-gray-900 focus:ring-2 focus:ring-brand-500/20 font-medium"
                                        required
                                    />
                                    <input
                                        type="time"
                                        name="timeSlot"
                                        value={formData.timeSlot}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border-0 rounded-xl px-3 py-3 text-xs text-gray-900 focus:ring-2 focus:ring-brand-500/20 font-medium"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3 rounded-xl mt-2 hover:bg-brand-700 transition shadow-lg shadow-brand-200 transform active:scale-95 duration-200 flex items-center justify-center gap-2">
                                    <PlusCircleIcon className="h-5 w-5" />
                                    Book Appointment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PatientDashboard;
