const express = require('express');
const router = express.Router();

const { createTask, getAllTasks,
    getTaskById } = require('../db/tasks.cjs');

// GET - /api/tasks - get all tasks
router.get('/', async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        res.send(tasks);
    } catch (error) {
        next(error);
    }
});

// GET - /api/task/:id - get a single task by id
router.get('/:id', async (req, res, next) => {
    try {
        const task = await getTasksById(req.params.id);
        res.send(task);
    } catch (error) {
        next(error);
    }
});


module.exports = router;