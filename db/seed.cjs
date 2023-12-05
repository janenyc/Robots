const client = require("./client.cjs");
const { createRobot} = require('./robots.cjs')
const { createOwner} = require('./owners.cjs')
const { createTask} = require('./tasks.cjs')
const { createRobotsOwners} = require('./robotsOwners.cjs')
const { createRobotsTasks} = require('./robotsTasks.cjs')

const dropTables = async () => {
    try {
        await client.query(`
        DROP TABLE IF EXISTS robots_tasks;
        DROP TABLE IF EXISTS robots_owners;
        DROP TABLE IF EXISTS owners;     
        DROP TABLE IF EXISTS tasks;
        DROP TABLE IF EXISTS robots;
        
        
        `);
        console.log("TABLES DROPPED");
    } catch (err) {
        console.log(err);
    }
};

const createTables = async () => {
    try {
        await client.query(`
        CREATE TABLE robots (
          id SERIAL PRIMARY KEY,
          name VARCHAR(30) NOT NULL,
          model VARCHAR(10) UNIQUE NOT NULL,
          company VARCHAR(30) NOT NULL,
          "imgURL" VARCHAR(255) DEFAULT 'https://imgur.com/gallery/46Gwmet',
          warranty_months INTEGER NOT NULL,
          is_safe BOOLEAN DEFAULT false,
          release_date DATE

        );

        CREATE TABLE owners (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            email VARCHAR(50) NOT NULL,
            robots_id int REFERENCES robots(id)
        );

        CREATE TABLE tasks (
          id SERIAL PRIMARY KEY,
          name VARCHAR(30) NOT NULL
        );

        CREATE TABLE robots_owners (
          robots_id int REFERENCES robots(id),
          owners_id int REFERENCES owners(id)
        );

        CREATE TABLE robots_tasks (
            robots_id int REFERENCES robots(id),
            tasks_id int REFERENCES tasks(id)
          );
        `);
    } catch (err) {
        console.log(err);
    }
};




const syncAndSeed = async () => {
    try {
        await client.connect();
        console.log("CONNECTED TO DATABASE");

        await dropTables();
        console.log("TABLES DROPPED");

        await createTables();
        console.log("TABLES CREATED");

        const alphaBot = await createRobot("AlphaBot", "A100", "RoboInc", '../images/robot1.jpeg', 24, true, '2021-01-15');
        const betaBot = await createRobot('BetaBot', 'B200', 'MechaCorp', '../images/robot2.jpeg', 36, false, '2020-06-22');
        const gammaBot = await createRobot('GammaBot', 'G300', 'Automata', '../images/robot3.jpeg', 12, true, '2022-09-10');
        const deltaBot = await createRobot('DeltaBot', 'D400', 'CyberSynth', '../images/robot4.jpeg', 48, true, '2019-11-30');
        const epsilonBot = await createRobot('EpsilonBot', 'E500', 'DroidWorks', '../images/robot5.jpeg', 18, false, '2023-03-05');


        const johnOwner = await createOwner('John Doe', 'john.doe@example.com', 1)      
        const janeOwner = await createOwner('Jane Smith', 'jane.smith@example.com', 2)
        const aliceOwner = await createOwner('Alice Johnson', 'alice.johnson@example.com', 3)
        const bobOwner = await createOwner('Bob Brown', 'bob.brown@example.com', 1)
        const charlieOwner = await createOwner('Charlie Davis', 'charlie.davis@example.com', 4);


        const listenTask = await createTask('Listening to Music')
        const washingTask = await createTask('Washing Dishes')
        const vacuumTask = await createTask('Vacuuming')
        const gardenTask = await createTask('Gardening')
        const laundryTask = await createTask('Doing Laundry')
        const cookingTask = await createTask ('Cooking')
        const groceryTask = await createTask('Grocery Shopping')
        const walkingDogTask = await createTask('Walking the Dog');

        await createRobotsOwners(alphaBot.id, johnOwner.id )
        await createRobotsOwners(betaBot.id, janeOwner.id )
        await createRobotsOwners(alphaBot.id, bobOwner.id )
        await createRobotsOwners(gammaBot.id, aliceOwner.id )
        await createRobotsOwners(deltaBot.id, charlieOwner.id )

        await createRobotsTasks(alphaBot.id, listenTask.id)
        await createRobotsTasks(alphaBot.id, laundryTask.id)
        await createRobotsTasks(alphaBot.id, walkingDogTask.id)
        await createRobotsTasks(betaBot.id, vacuumTask.id)
        await createRobotsTasks(betaBot.id, groceryTask.id)
        await createRobotsTasks(betaBot.id, gardenTask.id)
        await createRobotsTasks(gammaBot.id, washingTask.id)
        await createRobotsTasks(gammaBot.id, cookingTask.id)
        await createRobotsTasks(gammaBot.id, groceryTask.id)
        await createRobotsTasks(deltaBot.id, listenTask.id)
        await createRobotsTasks(deltaBot.id, gardenTask.id)
        await createRobotsTasks(deltaBot.id, walkingDogTask.id)
        await createRobotsTasks(epsilonBot.id, walkingDogTask.id)
        await createRobotsTasks(epsilonBot.id, vacuumTask.id)
        await createRobotsTasks(epsilonBot.id, laundryTask.id)
        await createRobotsTasks(epsilonBot.id, washingTask.id)

    } catch (err) {
        console.log(err);
    }
    await client.end();
    console.log("DISCONNECTED FROM DATABASE");
};

syncAndSeed();
