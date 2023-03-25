import express from 'express'
import dotenv from 'dotenv'
import ideas from './data/ideas.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/ideas', (req, res) => {
  res.json(ideas)
})

app.get('/api/ideas/:id', (req, res) => {
  const idea = ideas.find((i) => i._id === req.params.id)
  res.json(idea)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
