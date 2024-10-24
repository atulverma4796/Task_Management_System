const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const sequelize = require("./config/db")
const router = require("./routes/router")

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use("/api", router)

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.")
    return sequelize.sync()
  })
  .then(() => {
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
  })
