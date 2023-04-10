import express from 'express'
import { createUser,getUserByID, getUserLikedIdeas, getUserClaimedIdeas } from '../controllers/userController.js';



const router = express.Router()

// router.use(verifyJwt)
router.get("/:id", getUserByID);
router.get("/:id/liked", getUserLikedIdeas);
router.get("/:id/claimed", getUserClaimedIdeas);
router.post("/create", createUser);


export default router