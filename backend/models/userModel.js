//This is just a template for now, up to @Mohit to personalize it as per his needs

import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    swipedIdeas: [
      {
        idea: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Idea',
        },
        action: {
          type: String,
          enum: ['right', 'left'],
        },
      },
    ],
    
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
