import User from '../models/userModel.js'

// save new user to database
export const createUser = async (req, res) => {
  try {
    console.log('DEBUG: Inside CreateUser()')

    const { email, name } = req.body

    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
      console.log('DEBUG: Found Existing User')
      res.status(200).json({
        success: true,
        error: 'User is already saved so will be retruning it',
        data: existingUser,
      })
    } else {
      console.log('DEBUG: Creating Existing User')

      const newUser = new User({ email: email, name: name })
      await newUser.save()

      res.status(201).json({
        success: true,
        message: 'User Has been saved ',
        data: newUser,
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
}

// gets user by ID

export const getUserByID = async (req, res) => {
  try {
    console.log('DEBUG: InsideGetUserByID')

    const userID = req.params.id

    const user = await User.findById(userID)

    // No user found
    if (!user) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No user found with that ID' })
    }
    res.status(200).json({ status: 'success', data: user })

    res.status(200).json({
      success: true,
      message: 'User Returned',
      data: user,
    })
  } catch (err) {
    // Invalid id
    res.status(400).json({ status: 'fail', message: err })
  }
}

export const swipe = async (req, res) => {
  try {
    // Get the required information from the request body
    const { ideaId, action } = req.body

    // TODO: not forget to remove this and replace it with the user id from the request
    const user = await User.findById('64286fbe940e238c4a53f8fd')
    console.log(user.name)

    // Find the user and update their seenIdeas array
    await User.updateOne(
      {
        _id: '64286fbe940e238c4a53f8fd' /* TODO: replace with user._id */,
        'swipedIdeas.idea': { $ne: ideaId },
      },
      {
        $addToSet: {
          swipedIdeas: {
            idea: ideaId,
            action: action,
          },
        },
      }
    )

    // Implement any additional logic you may need based on the action (like/dislike)
    // ...
    console.log('Swipe recorded successfully')
    // Send a success response
    res.status(200).json({ message: 'Swipe recorded successfully' })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while recording the swipe' })
  }
}
