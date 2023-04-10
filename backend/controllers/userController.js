import User from '../models/userModel.js'
import Idea from '../models/ideaModel.js'


// save new user to database 
export const createUser = async (req, res) => {

  try{

    console.log("DEBUG: Inside CreateUser()");
   

    const {email, name} = req.body;
    
    const existingUser = await User.findOne({ email: email });

    
   if (existingUser) {

    console.log("DEBUG: Found Existing User");
        res.status(200).json({
        success: true,
        error: "User is already saved so will be retruning it",
        data: existingUser,
      });
      
    }else{ 


      const newUser = new User({ email: email, name: name});
      await newUser.save();

      res.status(201).json({
        success: true,
        message: "User Has been saved ",
        data: newUser,
      });
      

    }

    } catch (err) {
    console.error(err);
    res.status(500).send();
  }

 
}

// gets user by ID
export const getUserByID = async (req, res) => {
  try {

    const userID = req.params.id;

    const user = await User.findById(userID);


    // No user found
    if (!user) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No user found with that ID' })
    }
    
    res.status(200).json({
      success: true,
      message: "User Returned",
      data: user,
    });

  } catch (err) {
    // Invalid id
    res.status(400).json({ status: "fail", message: "Invalid ID" });
  }
};



// CONTROLLER: Returns users Liked Ideas
export const getUserLikedIdeas= async (req, res) => {

  try {

  const userID = req.params.id;
  const user = await User.findById(userID);

  // No user found
  if (!user) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'No user found with that ID' })
  }

   const likedIdeasIds = [];

   if (!user.swipedIdeas) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'User has not swiped any ideas' })
  }

// for each loop pushing ideas that are swiped right to the swipedIds list
   user.swipedIdeas.forEach(function (arrayItem) {

    if(arrayItem.action == "right"){

      likedIdeasIds.push(arrayItem.idea.toString());

    }

});

  // query returning ideas matching the passed array containing id's of ideas
  const likedIdeas = await Idea.find( {_id: {$in: likedIdeasIds}});

  if (!likedIdeas) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Database Error Searching for liked ideas' })
  }

  res.status(200).json({
    success: true,
    message: "Users Liked Ideas Returned",
    data: likedIdeas,
  });


  } catch (err) {
    // Invalid id
    res.status(400).json({ status: "fail", message: "Database Error" });
  }

}

//CONTROLLER: Returns users claimed Ideas
export const getUserClaimedIdeas= async (req, res) => {

  try {

      const userID = req.params.id;
      const user = await User.findById(userID);
    
      // No user found
      if (!user) {
        return res
          .status(404)
          .json({ status: 'fail', message: 'No user found with that ID' })
      }

      const claimedIdeasIds = [];

      if (!user.claimedIdeas) {
        return res
          .status(404)
          .json({ status: 'fail', message: 'claimed ideas Array Empty' })
      }
    
   
      // for each loop pushing ideas that are swiped right to the swipedIds list
        user.claimedIdeas.forEach(function (arrayItem) {

            claimedIdeasIds.push(arrayItem.toString());

      });

    

      // query returning ideas matching an array containing id's of ideas
      const claimedIdeas = await Idea.find( {_id: {$in: claimedIdeasIds}});


      if (!claimedIdeas) {
        return res
          .status(404)
          .json({ status: 'fail', message: 'Database Error Searching for claimed ideas' })
      }

      res.status(200).json({
        success: true,
        message: "Users Claimed Ideas Returned",
        data: claimedIdeas,
      });

  } catch (err) {
    // Invalid id
    res.status(400).json({ status: "fail", message: "Database Error" });
  }

}
