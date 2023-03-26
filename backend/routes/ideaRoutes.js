import express from 'express'
const router = express.Router()
import { getIdeas, getIdeaById } from '../controllers/ideaController.js'

router.get('/', getIdeas)
router.get('/:id', getIdeaById)

export default router
