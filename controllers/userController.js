const userModel = require('../models/userModel');
const generateToken = require('../config/generateToken');
const { findOne } = require('../models/userModel');
const bcrypt = require('bcryptjs');


module.exports.getAllUsers = async(req,res)=>{

    try {
        const user = await userModel.find();
        if(user){
            res.status(201).json({ 
               message : "User found",
               user : user
            });
        }
    } catch (error) {
        res.status(400).json({message : error.message});
    }
}

module.exports.signup = async (req,res) => {
  const { name , email , password , pic} = req.body;
  let existingUser;

    try {
         existingUser = await userModel.findOne({email});
        
    } catch (error) {
        console.log(err);
    }

    if(existingUser){
     res.status(200).json({ message: "user already exists login instead "});
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new userModel({
        name : name,
        email : email,
        password : hashedPassword,
        pic : pic
    })

    try {
        await user.save();
        
    } catch (error) {
        console.log(error);
    }

if(user){
    res.status(201).json({
        _id:user._id,
        name : user.name,
        email : user.email,
        isAdmin: user.isAdmin,
        pic : user.pic, 
        token: generateToken(user._id)
    });
  }
  else{ 
    res.status(400).json({message: "User not found"});
  }
}
module.exports.login = async (req, res) => {
  const { email , password } = req.body;

  let existingUser;

  try {
      existingUser = await userModel.findOne({email});
  } catch (error) {
      console.log(error);
  }

  if(!existingUser){
      res.status(200).json({ message: " Could not find the user by this email "});
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if(!isPasswordCorrect) {
     res.status(404).json({message: "Incorrect Password"});
  }
 res.status(200).json({message: "Login Successfull" , user: existingUser } );

};

 
  