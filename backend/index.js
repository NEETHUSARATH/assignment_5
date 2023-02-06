const express=require('express');
const Bodyparser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path');
const { employeeModel } = require('./src/model/employee');
const { userModel } = require('./src/model/user');
var app=new express();
app.use(express.static(path.join(__dirname+'/build','index.html')));
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));



mongoose.connect('mongodb+srv://NeeThuMongodb:16263646@cluster0.rviognq.mongodb.net/EmployeeDB?retryWrites=true&w=majority',{
    useNewUrlParser: true
});
//const JWT_SECRET ="";

//signup
const User = mongoose.model("userModel");
app.post("/signup", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

//login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "10s",
      });
  
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "Invalid Password" });
  });
  
  app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      });
      console.log(user);
      if (user == "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const useremail = user.email;
      User.findOne({ email: useremail })
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) {}
  });





  //employee CRUD
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