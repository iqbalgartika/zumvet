const CONST = require("./const");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONST.DB_SCHEMA, CONST.DB_USERNAME, CONST.DB_PASSWORD, {
    dialect: 'mysql',
    host: CONST.DB_HOST
});

module.exports = sequelize;