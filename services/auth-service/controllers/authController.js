//register, login
const auth = require('../models/authModel')
const bcrypt = require('bcryptjs')

exports.Register = async (req, res) => {
   try{
     const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400).json({
            message: "fields missing, cannot register"
        })
    }
    const user = await auth.findOne({email});
    if(user){
        res.status(400).json({
            message: "user already exists, login instead"
        })
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const newUser = new user({
        name, email, password:hashedPassword
    })
    const addedUser = await newUser.save();
    if(addedUser){
        res.status(200).json({
            message: "new registration successful",
            addedUser
        })
    }
   } catch (error){
    console.log('There was an error in registering the user')
    res.status(500).json({
        message: 'server error'
    })
   }
}