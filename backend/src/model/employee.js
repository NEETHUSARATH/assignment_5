const { default: mongoose} = require("mongoose");
let Mongoose = require("mongoose");

const employeeSchema = Mongoose.Schema(
    {
        name: String,
        designation:String,
        salary:Number
    }
);

let EmployeeModel = Mongoose.model("employees",employeeSchema);

module.exports = {EmployeeModel};