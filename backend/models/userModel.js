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
    password: {
      type: String,
      required: true,
    },
    likedIdeas: [
      {
        type: Schema.Types.ObjectId,
        ref: "likedIdeas",
      },
    ],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
