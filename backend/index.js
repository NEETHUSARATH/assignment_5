const express=require('express');
const Bodyparser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path');
const { employeeModel } = require('./model/employee');
var app=new express();
app.use(express.static(path.join(__dirname+'/frontend')));
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));



mongoose.connect('mongodb+srv://NeeThuMongodb:16263646@cluster0.rviognq.mongodb.net/EmployeeDB?retryWrites=true&w=majority',{
    useNewUrlParser: true
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
    res.sendFile(path.join(__dirname + '/frontend/public/index.html'));
});


app.listen(3000);