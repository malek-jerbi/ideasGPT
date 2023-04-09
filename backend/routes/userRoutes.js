import express from 'express'
import { createUser,getUserByID } from '../controllers/userController.js';



const router = express.Router()

// router.use(verifyJwt)
router.get("/:id", getUserByID)
router.post("/create", createUser);


export default router