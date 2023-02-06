const { default: mongoose} = require("mongoose");
let Mongoose = require("mongoose");

const userSchema = Mongoose.Schema(
    {
        
        email: String,
        password:String
       
    }
);

let UserModel = Mongoose.model("users",userSchema);

module.exports = {UserModel};