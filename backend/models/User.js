const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        role: {
            type: String,
            enum: ['patient', 'doctor'],
            default: 'patient',
        },
        department: {
            type: String,
            required: false, // Only for doctors
        },
        bio: {
            type: String,
            default: 'Experienced medical professional dedicated to patient care.',
        },
        experience: {
            type: Number,
            default: 5,
        },
        fees: {
            type: Number,
            default: 500,
        },
        rating: {
            type: Number,
            default: 4.8,
        },
        reviewCount: {
            type: Number,
            default: 120,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
