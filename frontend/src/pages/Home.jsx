import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { PhoneIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import {
    UserGroupIcon,
    AcademicCapIcon,
    BeakerIcon,
    HeartIcon
} from '@heroicons/react/24/outline';

const Home = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await api.get('/doctors');
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const doctorImages = {
        'Cardiology': 'https://www.doctorsapp.in/uploads/blog_image/images/270126_4673_blog_image.jpg',
        'Neurology': 'https://vishwarajhospital.com/wp-content/uploads/2023/07/17_Neurology.jpg',
        'Pediatrics': 'https://www.doctorsapp.in/uploads/blog_image/images/270126_4673_blog_image.jpg',
        'Psychiatry': 'https://www.doctorsapp.in/uploads/blog_image/images/270126_4673_blog_image.jpg',
        'Gynecology': 'https://www.wecmelive.com/cms/flyers/journal-of-gynecology-and-reproductive-health-flyer.jpg',
        'Internal Medicine': 'https://www.vasavihospitals.com/img/Home/vasavi-hospitals-internal-medicine-global-healthcare.jpg',
        'Dermatology': 'https://skinive.com/wp-content/uploads/2023/09/AI-Dermatology-604x339.jpg',
        'Orthopedics': 'https://bhardwajhospitalnoida.com/wp-content/uploads/2025/02/Common-Signs-You-Need-to-See-an-Orthopedic-Doctor.png',
        'Oncology': 'https://metrohospitalfaridabad.com/wp-content/uploads/2024/06/Medical-oncology.webp',
        'Pathology': 'https://www.fimssonipat.com/media/doctor/Pathology_lab_banner_image_OtegPVA.webp',
        'Gastroenterology': 'https://srmglobalhospitals.com/wp-content/uploads/2024/05/Gastroenterologist.png',
        'Pulmonology': 'https://arpitmediworld.com/wp-content/uploads/2025/02/When-to-See-a-Pulmonary-Specialist.jpg',
        'Endocrinology': 'https://prashanthfertility.com/wp-content/uploads/2023/07/thyroid-gland-doctor-looks-hologram-ultrasound-patient-s-thyroid-gland-ultrasound-diagnostics-thyroid-diseases-medical-indicators_99433-8622.webp',
        'Ophthalmology': 'https://media.istockphoto.com/id/1489731410/photo/digital-vision-eye-care-concept-doctor-using-technology-for-eye-test-vision-checking-eyesight.jpg?s=612x612&w=0&k=20&c=RBVpfwrF1XjNZM6Ur19V7AgdWwM2kiyEE6O5yfGOFN0=',
        'Dentistry': 'https://ifdww.com/wp-content/uploads/2024/03/dental-specialists-in-walla-walla.jpg',
        'Default': 'https://thumbs.dreamstime.com/b/cartoon-doctor-female-character-illustration-stethoscope-medical-report-healthcare-design-404916888.jpg'
    };

    return (
        <div className="min-h-screen bg-brand-50 font-sans text-gray-900">
            <Navbar />

            {/* Hero Section - Deep Purple Gradient */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-20 pt-16 lg:pt-32">

                {/* Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-20 w-[800px] h-[800px] bg-brand-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-500 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center">

                        {/* Left Content */}
                        <div className="w-full max-w-xl lg:shrink-0">

                            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-8 leading-tight">
                                Your Journey to <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-accent-100">Better Health</span> Starts Here
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-brand-100 max-w-lg">
                                Talk to the best doctors, book your appointments, and check your health details — all in one simple and beautiful app.
                            </p>

                            <div className="mt-10 flex items-center gap-x-6">
                                <Link
                                    to="/register"
                                    className="rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-900 shadow-2xl shadow-brand-900/20 hover:bg-brand-50 hover:scale-105 transition duration-300 flex items-center gap-2"
                                >
                                    Book Appointment
                                </Link>
                            </div>
                        </div>

                        {/* Right Content - Visual */}
                        <div className="relative mt-8 sm:mt-0 lg:mt-0 flex justify-end">
                            {/* Glass Card Container */}
                            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/20">
                                <img
                                    src="https://t4.ftcdn.net/jpg/06/14/96/05/360_F_614960515_mQsF7nS1r3qZ9eCHzqJ5cyCxmjsfJOCQ.jpg"
                                    alt="Doctor using tablet"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 sm:py-32" id="services">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-base font-semibold text-brand-600 tracking-wide uppercase">Why Choose Us</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Comprehensive Care for Your Family
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Qualified Specialists",
                                desc: "Access to over 20+ verified specialists across various medical fields.",
                                icon: AcademicCapIcon,
                                color: "bg-blue-50 text-blue-600"
                            },
                            {
                                title: "Modern Technology",
                                desc: "We use the latest medical technology for accurate diagnosis and treatment.",
                                icon: BeakerIcon,
                                color: "bg-purple-50 text-purple-600"
                            },
                            {
                                title: "Patient-First Approach",
                                desc: "Your health and comfort are our top priorities with 24/7 support coverage.",
                                icon: HeartIcon,
                                color: "bg-rose-50 text-rose-600"
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                                <div className={`h-14 w-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    <feature.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Specialists Section */}
            <div className="bg-white py-24 sm:py-32 relative overflow-hidden" id="specialists">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#693B69 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div className="max-w-xl">
                            <h2 className="text-base font-semibold text-brand-600 tracking-wide uppercase">Our Team</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Expert Specialists</p>
                            <p className="mt-4 text-gray-500">Dedicated professionals committed to providing the best medical care.</p>
                        </div>
                        <Link to="/register" className="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1 group">
                            View all doctors <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {doctors.length > 0 ? (
                            doctors.map((doctor, idx) => (
                                <div key={idx} className="group bg-white rounded-[2rem] p-4 shadow-card hover:shadow-2xl transition-all duration-300">
                                    <div className="relative mx-auto aspect-square rounded-[1.5rem] overflow-hidden mb-5 bg-brand-50">
                                        <img
                                            src={doctorImages[doctor.department] || doctorImages['Default']}
                                            alt={doctor.name}
                                            className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                    <div className="text-center px-2 pb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                                        <p className="text-sm text-brand-600 font-medium">{doctor.department || 'General Physician'}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                <p>No doctors found. Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-brand-900 py-12 border-t border-brand-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-brand-200 text-sm">
                        &copy; {new Date().getFullYear()} SwasthSeva Medical Center. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
