const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        default: 'user'
      },
    phonenumber:{
        type:String
    },
    userimg:{
        type:String
    },rating:{
        type:String
    },
    wishlist:[{type: mongoose.Schema.Types.ObjectId,ref:"properties"}]
},{timestamps:true})

const users = mongoose.model("users",userSchema)

module.exports = users

