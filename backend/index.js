import express from "express"
import dotenv from "dotenv"
import { connectionDB } from "./db/connectionDB.js"
import bookRoutes from "./routes/book.routes.js"

dotenv.config()
const app = express()
app.use(express.json()) //Allow to manage json data: req.body

app.use("/api/book", bookRoutes)

app.listen(3000, () => {
  connectionDB()
  console.log('Runing in port' + 3000)
})
