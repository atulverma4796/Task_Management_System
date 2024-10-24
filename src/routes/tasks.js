const express = require("express")
const jwt = require("jsonwebtoken")
const Task = require("../model/Task")
const FieldPermission = require("../model/FieldPermission")
const authMiddleware = require("../middleware/auth")

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || "lazybrownfox"

router.post("/", authMiddleware, async (req, res) => {
  const { title, description, status, dueDate } = req.body
  const assigneduserId = req.user.id

  try {
    const permissions = await FieldPermission.findAll({
      where: { role: req.user.role },
    })

    const taskData = {}
    permissions.forEach((permission) => {
      if (permission.field === "title" && permission.canEdit)
        taskData.title = title
      if (permission.field === "description" && permission.canEdit)
        taskData.description = description
      if (permission.field === "status" && permission.canEdit)
        taskData.status = status
      if (permission.field === "dueDate" && permission.canEdit)
        taskData.dueDate = dueDate
    })

    const task = await Task.create({ ...taskData, assigneduserId })
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { assigneduserId: req.user.id } })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  const taskId = req.params.id

  try {
    const task = await Task.findByPk(taskId)
    if (!task) return res.status(404).json({ error: "Task not found" })

    const permissions = await FieldPermission.findAll({
      where: { role: req.user.role },
    })
    const updatedData = {}

    permissions.forEach((permission) => {
      if (permission.field === "title" && permission.canEdit)
        updatedData.title = req.body.title
      if (permission.field === "description" && permission.canEdit)
        updatedData.description = req.body.description
      if (permission.field === "status" && permission.canEdit)
        updatedData.status = req.body.status
      if (permission.field === "dueDate" && permission.canEdit)
        updatedData.dueDate = req.body.dueDate
    })

    await task.update(updatedData)
    res.json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  const taskId = req.params.id

  try {
    const task = await Task.findByPk(taskId)
    if (!task) return res.status(404).json({ error: "Task not found" })

    await task.destroy()
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
