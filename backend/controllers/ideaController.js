import Idea from '../models/ideaModel.js'

export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({})
    res.json(ideas)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ideas' })
  }
}

export const getRandomIdea = async (req, res) => {
  try {
    const count = await Idea.countDocuments()

    if (count === 0) {
      res.status(404).json({ message: 'No ideas found' })
      return
    }

    const randomIndex = Math.floor(Math.random() * count)
    const idea = await Idea.findOne().skip(randomIndex)

    if (idea) {
      res.json({ text: idea.text, likes: idea.likes })
    } else {
      res.status(404).json({ message: 'Idea not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching idea' })
  }
}
