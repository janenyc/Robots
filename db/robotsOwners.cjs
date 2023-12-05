const client = require('./client.cjs');

const createRobotsOwners = async(robotsId, ownersId) => {
  try {
    const { rows: [ robotOwner ] } = await client.query(`
      INSERT INTO robots_owners (robots_id, owners_id)
      VALUES (${robotsId}, ${ownersId})
      RETURNING *;
    `);
    return robotOwner;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createRobotsOwners
}