const mongoose = require('mongoose');  // Import Mongoose

// Defines the schema for the task
const taskSchema = new mongoose.Schema({
  taskTitle: { type: String, required: true },  // Defines the Task title
  description: { type: String },  // Defines the Task description 
  completed: { type: Boolean, default: false },  // functionality for marking the task completed
  dueDatetime: { type: Date },  // Defines the due date
});

// Creates and exports the model
module.exports = mongoose.model('Task', taskSchema);
