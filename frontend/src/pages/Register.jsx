import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { UserIcon, LockClosedIcon, EnvelopeIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient',
        department: '',
    });

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await register(
                formData.name,
                formData.email,
                formData.password,
                formData.role,
                formData.department
            );
            toast.success('Registration successful!');
            if (userData.role === 'doctor') {
                navigate('/doctor-dashboard');
            } else {
                navigate('/patient-dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />
            {/* Main Content */}
            <div className="flex flex-1">

                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-brand-900">
                    <img
                        src="https://wallpapersok.com/images/high/medical-professional-preparing-for-surgery-ilyz12al21p6f21o.jpg"
                        alt="Medical Team"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-800/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-16 text-white z-10">
                        <h2 className="text-5xl font-bold mb-6 leading-tight">Join the <br /> SwasthSeva Family</h2>
                        <p className="text-lg text-brand-100 max-w-md font-light leading-relaxed">
                            Experience world-class healthcare management. Connect with top specialists and manage your journey to better health.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 lg:px-12 bg-white relative overflow-hidden">
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                    <div className="w-full max-w-md space-y-8 relative z-10">
                        <div className="text-center lg:text-left">
                            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                                Create Account
                            </h2>
                            <p className="text-gray-500">
                                Join us today! Please enter your details.
                            </p>
                        </div>

                        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="group">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-700 pl-1 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full rounded-2xl border-0 py-4 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all hover:bg-white"
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700 pl-1 mb-1.5">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full rounded-2xl border-0 py-4 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all hover:bg-white"
                                        placeholder="Enter your email id"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="group">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700 pl-1 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full rounded-2xl border-0 py-4 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all hover:bg-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Role */}
                            <div className="group">
                                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-700 pl-1 mb-1.5">
                                    I am a
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <BriefcaseIcon className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                                    </div>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="block w-full rounded-2xl border-0 py-4 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all hover:bg-white appearance-none"
                                    >
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Department - Only for Doctors */}
                            {formData.role === 'doctor' && (
                                <div className="group animate-fadeIn">
                                    <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-700 pl-1 mb-1.5">
                                        Department
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <BriefcaseIcon className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                                        </div>
                                        <select
                                            id="department"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className="block w-full rounded-2xl border-0 py-4 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all hover:bg-white appearance-none"
                                            required={formData.role === 'doctor'}
                                        >
                                            <option value="">Select Department</option>
                                            <option value="Cardiology">Cardiology</option>
                                            <option value="Neurology">Neurology</option>
                                            <option value="Orthopedics">Orthopedics</option>
                                            <option value="Pediatrics">Pediatrics</option>
                                            <option value="Dermatology">Dermatology</option>
                                            <option value="General Medicine">General Medicine</option>
                                            <option value="Psychiatry">Psychiatry</option>
                                            <option value="Gynecology">Gynecology</option>
                                            <option value="Internal Medicine">Internal Medicine</option>
                                            <option value="Oncology">Oncology</option>
                                            <option value="Pathology">Pathology</option>
                                            <option value="Gastroenterology">Gastroenterology</option>
                                            <option value="Pulmonology">Pulmonology</option>
                                            <option value="Endocrinology">Endocrinology</option>
                                            <option value="Ophthalmology">Ophthalmology</option>
                                            <option value="Dentistry">Dentistry</option>

                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-4 text-sm font-bold leading-6 text-white shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all duration-200 mt-2"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-brand-600 hover:text-brand-500 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
