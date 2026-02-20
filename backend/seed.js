const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const seedDoctors = async () => {
    try {
        // Clear existing users to avoid duplicates
        await User.deleteMany({ role: 'doctor' });
        console.log('Cleared existing doctor accounts...');

        const doctors = [

            { name: 'Dr. Naresh Trehan', email: 'naresh.trehan@gmail.com', password: '123', role: 'doctor', department: 'Cardiology' },

            { name: 'Dr. Ashok Rajgopal', email: 'ashok.rajgopal@gmail.com', password: '123', role: 'doctor', department: 'Orthopedics' },

            { name: 'Dr. Arvinder Singh Soin', email: 'arvinder.soin@gmail.com', password: '123', role: 'doctor', department: 'Gastroenterology' },

            { name: 'Dr. R. P. Singh', email: 'rp.singh@gmail.com', password: '123', role: 'doctor', department: 'Neurology' },

            { name: 'Dr. Hema Divakar', email: 'hema.divakar@gmail.com', password: '123', role: 'doctor', department: 'Gynecology' },

            { name: 'Dr. K. K. Aggarwal', email: 'kk.aggarwal@gmail.com', password: '123', role: 'doctor', department: 'Internal Medicine' },

            { name: 'Dr. Suresh Advani', email: 'suresh.advani@gmail.com', password: '123', role: 'doctor', department: 'Oncology' },

            { name: 'Dr. A. Velumani', email: 'a.velumani@gmail.com', password: '123', role: 'doctor', department: 'Pathology' },

            { name: 'Dr. Sandeep Arora', email: 'sandeep.arora@gmail.com', password: '123', role: 'doctor', department: 'Pediatrics' },

            { name: 'Dr. Rashmi Shetty', email: 'rashmi.shetty@gmail.com', password: '123', role: 'doctor', department: 'Dermatology' },

            { name: 'Dr. Samir Parikh', email: 'samir.parikh@gmail.com', password: '123', role: 'doctor', department: 'Psychiatry' },

            { name: 'Dr. Arvind Kumar', email: 'arvind.kumar@gmail.com', password: '123', role: 'doctor', department: 'Pulmonology' },

            { name: 'Dr. Ambrish Mithal', email: 'ambrish.mithal@gmail.com', password: '123', role: 'doctor', department: 'Endocrinology' },

            { name: 'Dr. Anita Sethi', email: 'anita.sethi@gmail.com', password: '123', role: 'doctor', department: 'Ophthalmology' },

            { name: 'Dr. Neha Gupta', email: 'neha.gupta@gmail.com', password: '123', role: 'doctor', department: 'Dentistry' }
        ];

        for (const doctor of doctors) {
            await User.create(doctor);
        }

        console.log('Doctors seeded successfully with hashed passwords!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedDoctors();
