import express from 'express'
import dotenv from 'dotenv' 
import mongoose from 'mongoose'
import cors from 'cors'

import chatbotRoutes from "./routes/chatbot.route.js"
import userRoutes from "./routes/user.route.js"
import conversationRoutes from "./routes/conversation.route.js"
import path from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
dotenv.config()

const port = process.env.PORT || 4002

//Middleware
app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//Database connetion code
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error)
})


// Defining Routing
app.use("/bot/v1/",chatbotRoutes)
app.use("/user/v1/",userRoutes)
app.use("/conversation/v1/",conversationRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
