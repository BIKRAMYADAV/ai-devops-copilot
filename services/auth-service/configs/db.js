const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI


exports.ConnectDB = async () => {
  try{
      const connected = await mongoose.connect(MONGO_URI);
    if(connected){
        console.log('connected to auth database')
    }
  } catch (error){
    console.log('failed to set up auth database', error)
  }
}