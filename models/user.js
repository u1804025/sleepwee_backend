const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
    },

    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a correct email'],
    },

    age: {
        type: Number,
        required: [true, 'Please provide your age'],
        min: [0, 'Age must be a positive number'],
    },

    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
    },
    about: {
        type: String,
    },


    address: {
        type: String,
        required: [true, 'Please provide your address'],
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false,
    },

    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
            default: "https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2022/01/male-doctor-coloring-page.png",
        },
    },

    role: {
        type: String,
        enum: ['doctor', 'patient'],
    },

    is_active: {
        type: Boolean,
        default: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('User', userSchema);
