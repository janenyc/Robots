const client = require('./client.cjs');

const createTask = async(name) => {
    try {
      const { rows: [ task] } = await client.query(`
        INSERT INTO tasks (name) 
        VALUES ($1)
        RETURNING *;
      `, [name]);

      return task;
    } catch(err) {
      console.log(err);
    }
  }

  const getAllTasks =async()=>{
    try{

    const {rows } =    await client.query(`
    SELECT * FROM tasks;
    `)
return rows
    }
    catch(err){
        console.log(err)
    }
}
// GET - /api/task/:id - get a single task by id
async function getTaskById(id) {
  try {
      const { rows: [task] } = await client.query(`
          SELECT * FROM tasks
          WHERE id = $1;
      `, [id]);
      return task;
  } catch (error) {
      throw error;
  }
}
  module.exports = {
    createTask, getAllTasks, getTaskById
  }