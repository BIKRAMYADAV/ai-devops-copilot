//register, login
const auth = require('../models/authModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const logger = require('../utils/logger.js')
const SECRET_KEY = process.env.SECRET_KEY

exports.Register = async (req, res) => {
    const reqId = req.headers['x-request-id'] || 'unknown'
    logger.info({
        event: 'register_attempt',
        reqId,
        email: req.body.email 
    })
   try{
     const {name, email, password} = req.body;
    if(!name || !email || !password){
       return res.status(400).json({
            message: "fields missing, cannot register"
        })
    }
    const user = await auth.findOne({email});
    if(user){
        logger.warn({
            event: 'register_user_exists',
            reqId,
            email
        })
       return res.status(400).json({
            message: "user already exists, login instead"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new auth({
        name, email, password:hashedPassword
    })
    const addedUser = await newUser.save();
    if(addedUser){
        logger.info({ event: 'register_success', requestId, email });
        return res.status(200).json({
            message: "new registration successful",
            addedUser
        })
    }
   } catch (error){
    console.log('There was an error in registering the user', error)
      logger.error({
      event: 'register_error',
      requestId,
      error: error.message,
      stack: error.stack
    });
    return res.status(500).json({
        message: 'server error'
    })
   }
}

exports.Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
           return res.status(400).json({
                message: "fields missing"
            })
        }
        const userFound = await auth.findOne({email});
        if(!userFound){
           return res.status(400).json({
                message: "user not found, register first"
            })
        }
        const passMatch = await bcrypt.compare(password, userFound.password);
        if(!passMatch){
            return res.status(400).json({
                message: "incorrect password"
            })
        }
       const token = jwt.sign(
  { id: userFound._id, email: userFound.email },
  SECRET_KEY,
  { expiresIn: "1d" }
);
        return res.status(200).json({
            message:"login successful",
            token
        })

    } catch(error){
         console.log('There was an error while logging in')
         return res.status(500).json({
        message: 'server error'
    })
    }
}