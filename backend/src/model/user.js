const { default: mongoose} = require("mongoose");
let Mongoose = require("mongoose");

const userSchema = Mongoose.Schema(
    {
        fname:String,
        lname:String,
        email: String,
        password:String,
        userType:String
        
        
       
    }
);

let UserModel = Mongoose.model("users",userSchema);

module.exports = {UserModel};