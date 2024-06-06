const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const SleepQuality = require('../models/sleepQuality');

exports.createSleepQuality = catchAsyncErrors(async (req, res, next) => {
  const { userId, sleepTime, wakeUp, quality, reason, solve } = req.body;

  const sleepQuality = await SleepQuality.create({
    userId,
    sleepTime,
    wakeUp,
    quality,
    reason,
    solve
  });

  res.status(201).json({
    success: true,
    data: sleepQuality
  });
});

// Get all sleep quality records => /api/v1/sleepQuality
exports.getAllSleepQualities = catchAsyncErrors(async (req, res, next) => {
  const sleepQualities = await SleepQuality.find().populate('userId', 'name email');

  res.status(200).json({
    success: true,
    data: sleepQualities
  });
});

