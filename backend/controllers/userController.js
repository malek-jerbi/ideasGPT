import User from '../models/userModel.js'


// save new user to database 
export const createUser = async (req, res) => {
  try{

    console.log("DEBUG: Inside CreateUser()");
    console.log(req.body)

    const {email, name} = req.body;


    
    const existingUser = await User.findOne({ email: email });
   if (existingUser) {
      return res.status(200).json({
        success: false,
        error: "User is already saved",
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
    const user = await db.User.findById(userID);

    // No user found
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "No user found with that ID" });
    }
    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    // Invalid id
    res.status(400).json({ status: "fail", message: err });
  }
};