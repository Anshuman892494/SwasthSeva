
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    HomeIcon,
    UsersIcon,
    CalendarIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navigation = user?.role === 'doctor' ? [
        { name: 'Dashboard', href: '/doctor-dashboard', icon: HomeIcon },
        { name: 'Patients', href: '/patients', icon: UsersIcon },
        { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    ] : [
        { name: 'Dashboard', href: '/patient-dashboard', icon: HomeIcon },
        { name: 'Appointments', href: '/appointments', icon: CalendarIcon },
        { name: 'Find Doctors', href: '/doctors', icon: UsersIcon },
        { name: 'Medical Records', href: '/medical-records', icon: ChartBarIcon },
        { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    ];

    return (
        <>
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600/75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-brand-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center justify-between">
                        <div className="flex items-center gap-2 text-white font-bold text-2xl">
                            <div className="bg-white/20 p-1.5 rounded-lg">
                                <div className="h-6 w-6 rounded-full border-2 border-white"></div>
                            </div>
                            SwasthSeva
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-2">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.href}
                                                className={`group flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 transition-all ${location.pathname === item.href ? 'bg-white/10 text-white shadow-sm' : 'text-brand-100 hover:bg-brand-500 hover:text-white'}`}
                                            >
                                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="mt-auto">
                                <button
                                    onClick={handleLogout}
                                    className="group -mx-2 flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 text-brand-100 hover:bg-brand-500 hover:text-white transition-all w-full"
                                >
                                    <ArrowRightOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
