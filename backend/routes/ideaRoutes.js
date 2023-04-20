// backend/routes/ideaRoutes.js

import express from 'express'
const router = express.Router()
import { getIdeas, getRandomIdea, deleteIdea } from '../controllers/ideaController.js'

router.get('/', getIdeas)
router.get('/random', getRandomIdea)
router.delete('/:id', deleteIdea);

export default router
