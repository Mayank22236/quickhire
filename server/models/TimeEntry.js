const mongoose = require('mongoose');
const timeEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  duration: Number,
  date: Date
}, { timestamps: true });
module.exports = mongoose.model('TimeEntry', timeEntrySchema);