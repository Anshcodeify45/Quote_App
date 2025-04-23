// const User = require('../model/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// require('dotenv').config();

// const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     // Hash the password before saving
//     const salt = await bcrypt.genSalt(12); // Generate salt
//     const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

//     // Create a new user with hashed password
//     const user = await User.create({ name, email, password: hashedPassword });
//     console.log("Hashing password:", password);
//     console.log("Hashed password:", hashedPassword);  

//     // Generate JWT token
//     const token = generateToken(user._id);

//     // Send response with the token
//     res.status(201).json({ token });

//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("login data>>",req.body);
//     const user = await User.findOne({ email });
//     console.log("stored password>>>",user.password);
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Compare the provided password with the hashed password stored in the database
//     const match = await bcrypt.compare(password, user.password);
//     console.log("matching>>>>",match);

//     if (!match) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // If the password matches, generate the JWT token
//     const token = generateToken(user._id);
//     res.json({ token });

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// module.exports = { registerUser, loginUser };

const asyncHandeler = require('express-async-handler');
const User = require('../model/User');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandeler(async(req,res)  => {
   const {name , email, password  } = req.body;

   if(!name || !email || !password){
    resizeBy.status(400);
    throw new Error("Please Enter all the Feilds");
   }


   const userExist = await  User.findOne({email});

   if(userExist){
    res.status(400);
    throw new Error("User already exist");
   }

   const user = await User.create({
    name,
    email,
    password,
   })

   if(user){
    res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id),
    })
   }else{
    res.status(400);
    throw new Error("Failed to Create new user");
   }
});



const loginUser = asyncHandeler(async (req,res) => {
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
            });
        }else {
            res.status(401);
            throw new Error("Invalid Email or Password");
          }
})

module.exports = { registerUser, loginUser };