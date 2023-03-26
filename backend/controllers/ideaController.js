import Idea from '../models/ideaModel.js'

export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({})
    res.json(ideas)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ideas' })
  }
}

export const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    if (idea) {
      res.json(idea)
    } else {
      res.status(404).json({ message: 'Idea not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching idea' })
  }
}
