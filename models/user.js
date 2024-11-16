const mongoose = require('mongoose');
const {isEmail} = require("validator")
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate:[isEmail, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        select: false,
        lowercase: true,
        minlength: [8, "password must be atleast 8 characters"]
       
    }

}, {
    timestamps:true
})

// fire a fucntion after doc saved to db
userSchema.post('save', function(doc, next){
    console.log("new user was created $ saved", doc)
    next()
})

// fire a function before doc saved to db
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User