import User from '../models/userModel.js'


// save new user to database 
export const createUser = async (req, res) => {
  try{

    const {email, name} = req.body;
    const newUser = new User({ email: email, });

      await newUser.save();
      res.status(200).send({
        message:
          "New User: " +
          newUser.email +
          ", has been saved.",
      });

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