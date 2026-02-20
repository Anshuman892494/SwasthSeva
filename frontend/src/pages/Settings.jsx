
import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import {
    UserCircleIcon,
    KeyIcon,
    BellIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const Settings = () => {
    const { user, updateUserProfile, updateUserPassword } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    // Profile Form State
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    // Password Form State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(profileData);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }
        try {
            await updateUserPassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            toast.success('Password updated successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update password');
        }
    };

    const tabs = [
        { id: 'profile', name: 'Profile Settings', icon: UserCircleIcon },
        { id: 'security', name: 'Security', icon: KeyIcon },
    ];

    // Shared Styles
    const inputContainerStyle = "group";
    const labelStyle = "block text-sm font-medium leading-6 text-gray-700 pl-1 mb-1.5";
    const inputWrapperStyle = "relative";
    const iconStyle = "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none";
    const iconSvgStyle = "h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors";
    const inputStyle = "block w-full rounded-2xl border-0 py-4 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all hover:bg-white";
    const buttonStyle = "flex w-full md:w-auto justify-center rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-4 text-sm font-bold leading-6 text-white shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all duration-200";

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
                    <p className="mt-2 text-gray-500">Manage your account preferences and personal details.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                    {/* Sidebar */}
                    <div className="w-full md:w-72 bg-gray-50/50 border-b md:border-b-0 md:border-r border-gray-100 p-6">
                        <nav className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        w-full flex items-center gap-4 px-4 py-4 text-sm font-bold rounded-2xl transition-all duration-200
                                        ${activeTab === tab.id
                                            ? 'bg-white text-brand-600 shadow-md ring-1 ring-gray-900/5 scale-[1.02]'
                                            : 'text-gray-500 hover:bg-white hover:text-brand-600 hover:shadow-sm'}
                                    `}
                                >
                                    <tab.icon className={`h-6 w-6 ${activeTab === tab.id ? 'text-brand-600' : 'text-gray-400'}`} />
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 md:p-12 relative overflow-hidden">
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                        <div className="relative z-10 max-w-2xl">
                            {activeTab === 'profile' && (
                                <form onSubmit={handleProfileSubmit} className="space-y-8 animate-fadeIn">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
                                        <p className="text-gray-500 mb-8">Update your personal details here.</p>

                                        <div className="space-y-6">
                                            {/* Full Name */}
                                            <div className={inputContainerStyle}>
                                                <label className={labelStyle}>Full Name</label>
                                                <div className={inputWrapperStyle}>
                                                    <div className={iconStyle}>
                                                        <UserCircleIcon className={iconSvgStyle} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={profileData.name}
                                                        onChange={handleProfileChange}
                                                        className={inputStyle}
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email Address */}
                                            <div className={inputContainerStyle}>
                                                <label className={labelStyle}>Email Address</label>
                                                <div className={inputWrapperStyle}>
                                                    <div className={iconStyle}>
                                                        <EnvelopeIcon className={iconSvgStyle} />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={profileData.email}
                                                        onChange={handleProfileChange}
                                                        className={`${inputStyle} opacity-70 cursor-not-allowed`}
                                                        disabled
                                                    />
                                                </div>
                                                <p className="mt-2 text-xs text-gray-400 pl-1">Email address cannot be changed directly.</p>
                                            </div>

                                            {/* Phone Number */}
                                            <div className={inputContainerStyle}>
                                                <label className={labelStyle}>Phone Number</label>
                                                <div className={inputWrapperStyle}>
                                                    <div className={iconStyle}>
                                                        <PhoneIcon className={iconSvgStyle} />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={profileData.phone}
                                                        onChange={handleProfileChange}
                                                        className={inputStyle}
                                                        placeholder="Enter your phone number"
                                                    />
                                                </div>
                                            </div>

                                            {/* Address */}
                                            <div className={inputContainerStyle}>
                                                <label className={labelStyle}>Address</label>
                                                <div className={inputWrapperStyle}>
                                                    <div className={`${iconStyle} items-start pt-4`}>
                                                        <MapPinIcon className={iconSvgStyle} />
                                                    </div>
                                                    <textarea
                                                        name="address"
                                                        rows={3}
                                                        value={profileData.address}
                                                        onChange={handleProfileChange}
                                                        className={`${inputStyle} pl-11 resize-none`}
                                                        placeholder="Enter your full address"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                                        <button type="submit" className={buttonStyle}>
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'security' && (
                                <form onSubmit={handlePasswordSubmit} className="space-y-8 animate-fadeIn">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h2>
                                        <p className="text-gray-500 mb-8">Ensure your account is using a long, random password to stay secure.</p>

                                        <div className="space-y-6">
                                            {/* Current Password */}
                                            <div className={inputContainerStyle}>
                                                <label className={labelStyle}>Current Password</label>
                                                <div className={inputWrapperStyle}>
                                                    <div className={iconStyle}>
                                                        <LockClosedIcon className={iconSvgStyle} />
                                                    </div>
                                                    <input
                                                        type="password"
                                                        name="currentPassword"
                                                        value={passwordData.currentPassword}
                                                        onChange={handlePasswordChange}
                                                        className={inputStyle}
                                                        placeholder="Enter current password"
                                                    />
                                                </div>
                                            </div>

                                            {/* New Password */}
                                            <div className={inputContainerStyle}>
                                                <label className={labelStyle}>New Password</label>
                                                <div className={inputWrapperStyle}>
                                                    <div className={iconStyle}>
                                                        <KeyIcon className={iconSvgStyle} />
                                                    </div>
                                                    <input
                                                        type="password"
                                                        name="newPassword"
                                                        value={passwordData.newPassword}
                                                        onChange={handlePasswordChange}
                                                        className={inputStyle}
                                                        placeholder="Enter new password"
                                                    />
                                                </div>
                                            </div>

                                            {/* Confirm Password */}
                                            <div className={inputContainerStyle}>
                                                <label className={labelStyle}>Confirm New Password</label>
                                                <div className={inputWrapperStyle}>
                                                    <div className={iconStyle}>
                                                        <KeyIcon className={iconSvgStyle} />
                                                    </div>
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={passwordData.confirmPassword}
                                                        onChange={handlePasswordChange}
                                                        className={inputStyle}
                                                        placeholder="Confirm new password"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                                        <button type="submit" className={buttonStyle}>
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
