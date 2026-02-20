import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);
            toast.success("Login successful!");
            if (userData.role === "doctor") {
                navigate("/doctor-dashboard");
            } else {
                navigate("/patient-dashboard");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
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
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLXW6FJaajMCAhsRjeAZlS3gVeo0IRagGfhA&s"
                        alt="Relaxing Wellness"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-800/50 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 p-16 text-white z-10">
                        <h2 className="text-5xl font-bold mb-6 leading-tight">
                            Welcome to <br /> Better Health
                        </h2>

                        <p className="text-lg text-brand-100 max-w-md font-light leading-relaxed">
                            View your medical records, book doctor visits, and talk to top specialists easily.
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
                                Sign In
                            </h2>
                            <p className="text-gray-500">
                                Welcome back! Please enter your details.
                            </p>
                        </div>

                        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                {/* Email */}
                                <div className="group">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-700 pl-1 mb-1.5"
                                    >
                                        Email
                                    </label>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                                        </div>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full rounded-2xl border-0 py-4 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all hover:bg-white"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="group">
                                    <div className="flex items-center justify-between pl-1 mb-1.5">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-700"
                                        >
                                            Password
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                                        </div>

                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full rounded-2xl border-0 py-4 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all hover:bg-white"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-4 text-sm font-bold leading-6 text-white shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all duration-200"
                                >
                                    Sign In to Dashboard
                                </button>
                            </div>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-bold text-brand-600 hover:text-brand-500 transition-colors"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
