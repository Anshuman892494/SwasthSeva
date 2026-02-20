import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen overflow-hidden bg-gray-50 flex transition-colors duration-300">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main content */}
            <main className="flex-1 lg:pl-0 overflow-y-auto">
                {/* Top Header */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 transition-colors duration-300">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <div className="relative">
                                <div className="flex items-center gap-x-3">
                                    <span className="hidden lg:flex lg:items-center">
                                        <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{user?.name}</span>
                                    </span>
                                    <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
                                        {user?.name?.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;

