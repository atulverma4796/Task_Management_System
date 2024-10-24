const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const User = require("./User")

const Task = sequelize.define("Task", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("To Do", "In Progress", "Done"),
    defaultValue: "To Do",
  },
  dueDate: DataTypes.DATE,
  assigneduserId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" },
  },
})

module.exports = Task
