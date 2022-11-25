const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const Subscription = sequelize.define("subscription", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Subscription;
