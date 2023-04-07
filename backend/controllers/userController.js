import User from '../models/userModel.js'


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

      console.log("DEBUG: Creating Existing User");

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

    console.log("DEBUG: InsideGetUserByID");

    const userID = req.params.id;
  
    const user = await User.findById(userID);
    
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