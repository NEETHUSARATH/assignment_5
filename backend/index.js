const express=require('express');
const Bodyparser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path');
const { employeeModel } = require('./src/model/employee');
const { userModel } = require('./src/model/user');
var app=new express();
app.use(express.static(path.join(__dirname+'/build')));
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));



mongoose.connect('mongodb+srv://NeeThuMongodb:16263646@cluster0.rviognq.mongodb.net/EmployeeDB?retryWrites=true&w=majority',{
    useNewUrlParser: true
});
//signin
app.post("/login",(req,res)=>{
    try{  
       var userName=req.body.userName;
       var password=req.body.password;

       
       let result=userModel.find({userName:userName},(err,data)=>{
           if(data.length>0){
               
               const PasswordValidator=Bcrypt.compareSync(password,data[0].password)
               if(PasswordValidator){
                    jwt.sign({userName:userName,id:data[0]._id},"employeeApp",{expiresIn:"1d"},
                    (err,token)=>{
                       if (err) {
                           res.json({"status":"error","error":err}) 
                       } 
                       else {
                           res.json({"status":"success","data":data,"token":token})
                           
                       }
                    })
                   
               }
               else{
                   res.json({"Status":"Failed to Login","data":"Invalid Password"})
               }
           }
           else{
               res.json({"Status":"Failed to Login","data":"Invalid user id"})
           }
       })
   }catch(error){
       console.log(error)
   }
   })

app.post('/api/employeelist',(req,res)=>{
    var data=req.body;
    var employee=new employeeModel(data);
    employee.save(
        (err,data)=>{
            if (err) {
                res.json({"status":"error","error":err})
            } else {
              res.json({"status":"success","data":data})  
            }
        }
    );
})






app.get('/api/employeelist',(req,res)=>{
    employeeModel.find((err,data)=>{
       if (err) {
           res.json({"status":"error","error":err})
       } else {
           res.json(data);
       }

       }
    )
})




app.get('/api/employeelist/:id',(req,res)=>{
    var id=req.params.id;
    employeeModel.findById({_id:id},function(err,data){
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
});   
    



app.post('/api/employeelist',(req,res)=>{
    var data=req.body;
    var employee=new employeeModel(data);
    employee.save(
        (err,data)=>{
            if (err) {
                res.json({"status":"error","error":err})
            } else {
              res.json({"status":"success","data":data})  
            }
        }
    );
})



app.delete('/api/employeelist/:id',(req,res)=>{
   var id=req.params.id;
    employeeModel.deleteOne(
        {_id:id},(err,data)=>{
            if (err) {
                res.json({"status":"error","error":err})
            } else {
                res.json({"status":"deleted","data":data})
            }
        }
    )
})



app.put('/api/employeelist',(req,res)=>{
    var salary=req.body.salary;
    var data=req.body;
   employeeModel.findOneAndUpdate(
    {"salary":salary},data,(err,data)=>{
        if(err){
            res.json({"status":"error","error":err})
        }
        else{
            res.json({"status": "updated","data": data});
        }
    }
        
)}
) 



app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});


app.listen(3005);