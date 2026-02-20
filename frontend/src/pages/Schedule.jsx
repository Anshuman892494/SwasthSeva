
import DashboardLayout from '../components/DashboardLayout';

const Schedule = () => {
    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Schedule</h1>
                <div className="mt-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <p className="text-gray-500">Manage your appointment schedule here.</p>
                        {/* Future implementation: Calendar view, availability settings, etc. */}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Schedule;
