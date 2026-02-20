import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
        setOpen(false);
    };

    const dashboardPath =
        user?.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100"
                : "bg-white/50 backdrop-blur-sm border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
                        <div className="h-10 w-10 bg-gradient-to-br from-brand-600 to-brand-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-200 group-hover:scale-105 transition duration-300">
                            S
                        </div>
                        <span className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-brand-700 transition">
                            Swasth<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">Seva</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Specialists', href: '#specialists' },
                            { name: 'Services', href: '#services' },
                        ].map((link) => (
                            link.path ? (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive(link.path)
                                        ? "bg-brand-50 text-brand-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-brand-600"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-brand-600 transition-all duration-200"
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-gray-900 leading-none">{user.name}</p>
                                    <p className="text-[10px] text-brand-500 font-bold uppercase tracking-wider mt-1">{user.role}</p>
                                </div>

                                <Link
                                    to={dashboardPath}
                                    className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-gray-50 text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition"
                                    title="Dashboard"
                                >
                                    <UserCircleIcon className="h-6 w-6" />
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                                    title="Logout"
                                >
                                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="hidden sm:inline-flex text-gray-700 hover:text-brand-600 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="hidden sm:inline-flex bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:shadow-lg hover:shadow-brand-500/30 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Book Now
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 h-0"}`}>
                <div className="px-6 py-6 space-y-4">
                    <div className="space-y-2">
                        <Link to="/" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-brand-600">Home</Link>
                        <a href="#specialists" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-brand-600">Specialists</a>
                        <a href="#services" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-brand-600">Services</a>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        {user ? (
                            <div className="space-y-3">
                                <div className="px-4 flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-brand-600 uppercase font-semibold">{user.role}</p>
                                    </div>
                                </div>
                                <Link to={dashboardPath} onClick={() => setOpen(false)} className="block w-full text-center py-3 rounded-xl bg-brand-50 text-brand-700 font-bold">
                                    Go to Dashboard
                                </Link>
                                <button onClick={handleLogout} className="block w-full text-center py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Link to="/login" onClick={() => setOpen(false)} className="flex items-center justify-center px-4 py-3 rounded-xl border border-gray-200 text-gray-900 font-bold hover:bg-gray-50">
                                    Log in
                                </Link>
                                <Link to="/register" onClick={() => setOpen(false)} className="flex items-center justify-center px-4 py-3 rounded-xl bg-brand-600 text-white font-bold shadow-lg shadow-brand-200">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
