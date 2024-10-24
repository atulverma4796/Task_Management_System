const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = "lazybrownfox"
module.exports = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ error: "No token provided" })
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" })
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Unauthorized" })
      }

      req.user = decode
      next()
    })
  }
}
