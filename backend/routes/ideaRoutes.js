import express from 'express'
const router = express.Router()
import Idea from '../models/ideaModel.js'

router.get('/', async (request, response) => {
  try {
    const ideas = await Idea.find({})
    response.json(ideas)
  } catch (error) {
    response.status(500).json({ message: 'Error fetching ideas' })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id)
    if (idea) {
      response.json(idea)
    } else {
      response.status(404).json({ message: 'Idea not found' })
    }
  } catch (error) {
    response.status(500).json({ message: 'Error fetching idea' })
  }
})

export default router
