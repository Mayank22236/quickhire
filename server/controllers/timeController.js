const TimeEntry = require('../models/TimeEntry');

exports.logTime = async (req, res) => {
  const { taskId, duration, date } = req.body;
  try {
    const entry = await TimeEntry.create({ taskId, duration, date, userId: req.user.id });
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTimeLogs = async (req, res) => {
  const logs = await TimeEntry.find({ userId: req.user.id });
  res.json(logs);
};
