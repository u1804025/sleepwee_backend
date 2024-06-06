const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the patient ID'],
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the doctor ID'],
  },
  appointmentTime: {
    type: String,
    required: [true, 'Please provide the appointment time'],
  },
  reason: {
    type: String,
    required: [true, 'Please provide the reason for the appointment'],
    maxLength: [100, 'Reason cannot exceed 100 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
