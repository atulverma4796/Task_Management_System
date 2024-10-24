const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/User")
const FieldPermission = require("../model/FieldPermission")

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || "lazybrownfox"

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// Register route
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password: hashedPassword, role })
    res.status(201).json({ message: "User registered successfully", user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ where: { username } })
    if (!user) return res.status(404).json({ error: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" })

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    })

    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (!user) return res.status(404).json({ error: "User not found" })

    const { password, ...userDetails } = user.dataValues
    res.json(userDetails)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Set field permissions (admin only)
// router.post("/permissions", async (req, res) => {
//   const { role, field, canView, canEdit } = req.body

//   try {
//     const permission = await FieldPermission.findOne({ where: { role, field } })

//     if (permission) {
//       permission.canView = canView
//       permission.canEdit = canEdit
//       await permission.save()
//       return res
//         .status(200)
//         .json({ message: "Field permissions updated successfully" })
//     }

//     const newPermission = await FieldPermission.create({
//       role,
//       field,
//       canView,
//       canEdit,
//     })
//     res.status(201).json({
//       message: "Field permissions created successfully",
//       newPermission,
//     })
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// })
router.get("/permissions", authenticateToken, async (req, res) => {
  console.log(req)
  try {
    const permissions = await FieldPermission.findAll({
      where: { role: req.user.role },
    })
    res.json(permissions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
