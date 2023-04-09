import User from '../models/userModel.js'
import Idea from '../models/ideaModel.js'

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
}

const getUserByAuth0Id = async (auth0Id) => {
  return await User.findOne({ auth0Id });
}

const createNewUser = async (email, name, auth0Id) => {
  const user = new User({ email, name, auth0Id });
  return await user.save();
}

const updateUserAuth0Id = async (user, auth0Id) => {
  user.auth0Id = auth0Id;
  return await user.save();
}

export const createUser = async (req, res) => {
  try {
    console.log('DEBUG: Inside CreateUser()')

    const { email, name } = req.body;
    const auth0Id = req.auth.payload.sub;

    let user = await getUserByAuth0Id(auth0Id);

    if (user) {
      console.log('DEBUG: Found Existing User');
      res.status(200).json({
        success: true,
        error: 'User is already saved so will be returning it',
        data: user,
      });
    } else {
      user = await getUserByEmail(email);

      if (user) {
        console.log('DEBUG: Found User with Same Email');
        user = await updateUserAuth0Id(user, auth0Id);
      } else {
        console.log('DEBUG: Creating New User');
        user = await createNewUser(email, name, auth0Id);
      }

      res.status(201).json({
        success: true,
        message: 'User Has been saved',
        data: user,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

export const getUserByID = async (req, res) => {
  try {
    console.log('DEBUG: InsideGetUserByID');

    const userID = req.params.id;

    const user = await User.findById(userID);

    if (!user) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No user found with that ID' });
    }
    res.status(200).json({ status: 'success', data: user });

  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
}

export const swipe = async (req, res) => {
  try {
    const { ideaId, action } = req.body;
    const userId = req.auth.payload.sub;

    const user = await User.findOne({ auth0Id: userId });

    await User.updateOne(
      {
        auth0Id: userId,
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
    );

    if (action === 'right') {
      await Idea.findByIdAndUpdate(ideaId, { $inc: { likes: 1 } });
    } else if (action === 'left') {
      await Idea.findByIdAndUpdate(ideaId, { $inc: { likes: -1 } });
    }

    console.log('Swipe recorded successfully');
    res.status(200).json({ message: 'Swipe recorded successfully' });
  } catch (error) {
    console.error(error);
    res
    .status(500)
    .json({ error: 'An error occurred while recording the swipe' });
  }
};

export const claimIdea = async (req, res) => {
  try {
    console.log('DEBUG: Inside claimIdea');
    const { ideaId } = req.body;
    const userId = req.auth.payload.sub;

    const user = await User.findOne({ auth0Id: userId });

    if (!user) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No user found with that ID' });
    }

    const idea = await Idea.findById(ideaId);

    if (!idea) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No idea found with that ID' });
    }

    // Update user credits and add the claimed idea to the user's claimedIdeas array
    await User.updateOne(
      { auth0Id: userId },
      {
        $inc: { credits: -idea.cost },
        $addToSet: { claimedIdeas: ideaId },
      }
    );

    // Update the idea's claimed status
    await Idea.findByIdAndUpdate(ideaId, { $set: { isClaimed: true } });

    // Fetch the updated user information
    const updatedUser = await User.findOne({ auth0Id: userId });

    console.log('Idea claimed successfully');
    res.status(200).json({ message: 'Idea claimed successfully', data: updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while claiming the idea' });
  }
};
