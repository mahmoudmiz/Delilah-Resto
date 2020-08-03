const Sequelize = require("sequelize");

// connecting to the database
module.exports = new Sequelize(`mysql://mahmoud:1471991@localhost:3307/resto`);
