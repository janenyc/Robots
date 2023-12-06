const express = require('express');
const router = express.Router();

const { createRobot, getAllRobots,
    getRobotById } = require('../db/robots.cjs');

// GET - /api/robots - get all robots
router.get('/', async (req, res, next) => {
    try {
        const robots = await getAllRobots();
        res.send(robots);
    } catch (error) {
        next(error);
    }
});

// GET - /api/robots/:id - get a single robot by id
router.get('/:id', async (req, res, next) => {
    try {
        const robot = await getRobotById(req.params.id);
        res.send(robot);
    } catch (error) {
        next(error);
    }
});


module.exports = router;