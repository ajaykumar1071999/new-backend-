import express from 'express'
import 'dotenv/config'
import { connectToDB } from './db/index.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

connectToDB()

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
