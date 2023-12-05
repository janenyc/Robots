const client = require('./client.cjs');

const createRobotsTasks = async(robotsId, tasksId) => {
  try {
    const { rows: [ robotTask ] } = await client.query(`
      INSERT INTO robots_tasks (robots_id, tasks_id)
      VALUES (${robotsId}, ${tasksId})
      RETURNING *;
    `);
    return robotTask;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createRobotsTasks
}