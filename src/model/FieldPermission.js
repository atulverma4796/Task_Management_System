const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const FieldPermission = sequelize.define("FieldPermission", {
  role: { type: DataTypes.ENUM("Manager", "Employee"), allowNull: false },
  field: { type: DataTypes.STRING, allowNull: false },
  canView: { type: DataTypes.BOOLEAN, allowNull: true },
  canEdit: { type: DataTypes.BOOLEAN, allowNull: false },
})

module.exports = FieldPermission
