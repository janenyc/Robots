const client = require('./client.cjs');

const createOwner = async(name, email, robots_id) => {
    
    try {
      const { rows: [ owner] } = await client.query(`
        INSERT INTO owners (name, email, robots_id) 
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [name, email, robots_id]);

      return owner;
    } catch(err) {
      console.log(err);
    }
  }

  
  

  module.exports = {
    createOwner
  }