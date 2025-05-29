const Task = require('../models/Task');
const TimeEntry = require('../models/TimeEntry');
const mongoose = require('mongoose');

exports.getStats = async (req, res) => {
  const userId = req.user.id;
  try {
    const totalTasks = await Task.countDocuments({ userId });
    const completed = await Task.countDocuments({ userId, status: 'completed' });
    const timeSpent = await TimeEntry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$duration" } } }
    ]);
    res.json({
      totalTasks,
      completed,
      timeSpent: timeSpent[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};