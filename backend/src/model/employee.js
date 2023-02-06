const { default: mongoose} = require("mongoose");
let Mongoose = require("mongoose");

const employeeSchema = Mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
      
        designation:{
            type:String,
            required: true
        },

        place:{
            type:String,
            required: true
        },
        salary:{
            type:Number,
            required: true
        }
    });

let EmployeeModel = Mongoose.model("employees",employeeSchema);

module.exports = {EmployeeModel};