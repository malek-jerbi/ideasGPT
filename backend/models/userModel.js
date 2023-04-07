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
          enum: ['like', 'dislike'],
        },
      },
    ],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
