import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import ideaRoutes from './routes/ideaRoutes.js'
import openaiRoutes from './routes/openaiRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('API is running...')
})

app.use('/api/ideas', ideaRoutes)

app.use('/api/openai', openaiRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
