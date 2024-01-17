const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String ,
        required: true
    },
    email:{
        type: String ,
        required: true
        
    },
    password:{
        type: String ,
        required: true
    },
    address:{
        type: String ,
        required: true
    },
    date:{
        type: Date ,
        required: Date.now
    }
})

module.exports = mongoose.model("user",UserSchema)