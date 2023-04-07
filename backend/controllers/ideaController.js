import Idea from '../models/ideaModel.js'
import User from '../models/userModel.js'
import { generateIdea as generateIdeaFromOpenAI } from './openaiController.js'

export const getIdeas = async (req, res) => {
  try {
    console.log('here')
    const ideas = await Idea.find({})
    res.json(ideas)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ideas' })
  }
}

export const getRandomIdea = async (req, res) => {
  try {
    // Replace this with the user's _id you want to filter the ideas for
    const userId = '64286fbe940e238c4a53f8fd'

    // Retrieve the user's swiped ideas
    const user = await User.findById(userId)
    const swipedIdeaIds = user.swipedIdeas.map((swipe) => swipe.idea)

    // Get the count of ideas not in the user's swipedIdeas array
    const count = await Idea.countDocuments({ _id: { $nin: swipedIdeaIds } })

    if (count === 0) {
      try {
        // Generate a new idea from OpenAI
        const newIdeaText = await generateIdeaFromOpenAI()

        // Save the new idea to the database
        const newIdea = new Idea({ text: newIdeaText, likes: 0 })
        await newIdea.save()
        console.log(newIdea)

        // Return the new idea
        res.json({ id: newIdea._id, text: newIdea.text, likes: newIdea.likes })
        return
      } catch (error) {
        console.error('Error generating and saving new idea:', error)
        throw error
      }
    }

    const randomIndex = Math.floor(Math.random() * count)
    const idea = await Idea.findOne({ _id: { $nin: swipedIdeaIds } }).skip(
      randomIndex
    )

    if (idea) {
      res.json({ id: idea._id, text: idea.text, likes: idea.likes })
    } else {
      res.status(404).json({ message: 'Idea not found' })
    }
  } catch (error) {
    console.error('Error fetching idea:', error)
    res.status(500).json({ message: 'Error fetching idea' })
  }
}
