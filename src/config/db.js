const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
  process.env.DB_NAME || "task_management",
  process.env.DB_USER || "task_user",
  process.env.DB_PASS || "12345",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
)

module.exports = sequelize
