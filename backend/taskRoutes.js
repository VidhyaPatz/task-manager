const express = require('express');
const router = express.Router();  // Create a router instance
const Task = require('./models/Task');  // Import the Task model


// Creates a new task
router.post('/', async (request, response) => {
  try {
      // Checks to see if all fields are completed
      if (!request.body.taskTitle || !request.body.description ||
          !request.body.dueDatetime) {
          return response.status(400).send({
          message: 'Send all required fields: taskTitle, description, completed, dueDatetime',
          });
      }

      // Creates new tasks to insert into the database
      const newTask = {
          taskTitle: request.body.taskTitle,
          description: request.body.description,
          completed: request.body.completed,
          dueDatetime: request.body.dueDatetime,
      };

      const task = await Task.create(newTask);
      return response.status(201).send(task);

  } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message});
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();  // Retrieve all tasks from the database
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a task
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;  // Export the router