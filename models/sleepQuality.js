const mongoose = require('mongoose');

const sleepQualitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the user ID']
  },
  sleepTime: {
    type: String,
    required: [true, 'Please provide the sleep time']
  },
  wakeUp: {
    type: String,
    required: [true, 'Please provide the wake-up time']
  },
  quality: {
    type: String,
    required: [true, 'Please provide the sleep quality']
  },
  reason: {
    type: String,
    required: [true, 'Please provide the reason for sleep quality']
  },
  solve: {
    type: String,
    required: [true, 'Please provide the solution for sleep quality']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SleepQuality', sleepQualitySchema);
