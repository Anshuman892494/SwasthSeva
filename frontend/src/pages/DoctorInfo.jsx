
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import api from '../api/axios';
import { toast } from 'react-toastify';
import {
    UserIcon,
    StarIcon,
    CurrencyRupeeIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const DoctorInfo = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
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

    const departmentData = {
        'Cardiology': { bio: 'Heart specialist with expertise in cardiac procedures.', rating: 4.9, reviews: 210 },
        'Neurology': { bio: 'Expert in treating disorders of the nervous system.', rating: 4.8, reviews: 180 },
        'Pediatrics': { bio: 'Compassionate care for infants, children, and adolescents.', rating: 4.9, reviews: 300 },
        'Psychiatry': { bio: 'Specialist in mental health and well-being.', rating: 4.7, reviews: 150 },
        'Gynecology': { bio: 'Women\'s health specialist and obstetrician.', rating: 4.9, reviews: 320 },
        'Internal Medicine': { bio: 'Preventing, diagnosing, and treating adult diseases.', rating: 4.6, reviews: 400 },
        'Dermatology': { bio: 'Specialist in skin, hair, and nail conditions.', rating: 4.8, reviews: 250 },
        'Orthopedics': { bio: 'Treating musculoskeletal trauma, sports injuries, and spine diseases.', rating: 4.7, reviews: 190 },
        'Oncology': { bio: 'Dedicated to cancer diagnosis, treatment, and care.', rating: 5.0, reviews: 120 },
        'Pathology': { bio: 'Expert in disease diagnosis through lab analysis.', rating: 4.5, reviews: 80 },
        'Gastroenterology': { bio: 'Specialist in digestive system disorders.', rating: 4.8, reviews: 160 },
        'Pulmonology': { bio: 'Expert in respiratory system and lung diseases.', rating: 4.7, reviews: 140 },
        'Endocrinology': { bio: 'Specialist in hormone-related diseases and conditions.', rating: 4.6, reviews: 130 },
        'Ophthalmology': { bio: 'Specialist in eye and vision care.', rating: 4.8, reviews: 220 },
        'Dentistry': { bio: 'Oral health specialist.', rating: 4.9, reviews: 280 },
        'Default': { bio: 'Dedicated professional with a passion for patient care.', rating: 4.5, reviews: 50 }
    };

    const fetchDoctors = async () => {
        try {
            const response = await api.get('/doctors');
            setDoctors(response.data);
        } catch (error) {
            toast.error('Failed to fetch doctor details');
        } finally {
            setLoading(false);
        }
    };

    const handleBookAppointment = (doctorName, department) => {
        // Navigate to dashboard with pre-filled state if possible, or just redirect
        // Ideally we would pass state to the dashboard, but for now a simple redirect works
        navigate('/patient-dashboard');
        toast.info(`Please use the "Quick Schedule" form to book with Dr. ${doctorName}`);
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
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Meet Our Specialists
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Top-rated doctors dedicated to your health and well-being.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {doctors.map((doc) => (
                        <div key={doc._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">

                            {/* Header / Profile Image Placeholder */}
                            <div className="h-48 relative group-hover:scale-105 transition-transform duration-500">
                                <img
                                    src={doctorImages[doc.department] || doctorImages['Default']}
                                    alt={doc.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>

                            <div className="pt-16 pb-6 px-6 flex-grow flex flex-col items-center text-center">
                                <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
                                <p className="text-sm font-medium text-brand-600 uppercase tracking-wide mt-1">{doc.department || 'General Physician'}</p>

                                {/* Ratings */}
                                <div className="flex items-center gap-1 mt-3">
                                    <StarIcon className="h-5 w-5 text-yellow-400" />
                                    <span className="font-bold text-gray-900">{departmentData[doc.department]?.rating || departmentData['Default'].rating}</span>
                                    <span className="text-gray-500 text-sm">({departmentData[doc.department]?.reviews || departmentData['Default'].reviews} reviews)</span>
                                </div>

                                {/* Bio */}
                                <p className="mt-4 text-gray-600 text-sm italic line-clamp-3">
                                    "{departmentData[doc.department]?.bio || departmentData['Default'].bio}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DoctorInfo;
