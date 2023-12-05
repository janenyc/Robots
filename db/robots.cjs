const client = require('./client.cjs');

const createRobot = async(name, model, company, imgURL, warranty_months, is_safe, release_date) => {
  try {
      const { rows: [robot] } = await client.query(`
          INSERT INTO robots (name, model, company, "imgURL", warranty_months, is_safe, release_date) 
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
      `, [name, model, company, imgURL, warranty_months, is_safe, release_date]); // Pass the parameters here

      return robot;
  } catch(err) {
      console.log(err);
  }
}

  const getAllRobots =async()=>{
    try{

    const {rows } =    await client.query(`
    SELECT * FROM robots;
    `)
return rows
    }
    catch(err){
        console.log(err)
    }
}
// GET - /api/robots/:id - get a single robot by id
async function getRobotById(id) {
  try {
      const { rows: [robot] } = await client.query(`
          SELECT * FROM robots
          WHERE id = $1;
      `, [id]);
      return robot;
  } catch (error) {
      throw error;
  }
}
  module.exports = {
    createRobot, getAllRobots, getRobotById
  }