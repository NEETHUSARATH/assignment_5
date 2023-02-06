import axios from 'axios';
import { response } from 'express';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate= useNavigate();
  const[userName,setuserName]=useState('');
  const[password,setPassword]=useState();

  const userAuthentication =()=>{
    const userData={
      "userName":userName,
      "password":password
    }
    console.log(userData)
    axios.post(`http://localhost:3005/login`,userData
    
    ).then((response)=>{
      console.log(response.data)
      if(response.data.status=="success"){
        let token=response.data.token
        let userId=response.data.data[0]._id
        alert("valid user")

        sessionStorage.setItem("userToken",token)
        sessionStorage.setItem("userId",userId)

        navigate("/user")
        
      }
      else{
        alert("invalid user");
      }
    })
  }


  return (
    <div>
        <div className="container">
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <form>
                <div class="form-outline mb-4">
                  <h1>Login to your Account</h1>
                  <input 
                  type="userName" 
                  id="form2Example1" 
                  class="form-control" 
                  placeholder='Username'
                  onChange={(e)=>setuserName(e.target.value)}/>
                  <label class="form-label" for="form2Example1">Username</label>
                </div>

                <div class="form-outline mb-4">
                  <input 
                  type="password" 
                  id="form2Example2" 
                  placeholder='Password'
                  class="form-control" 
                  onChange={(e)=>setPassword(e.target.value)}/>

                  <label class="form-label" for="form2Example2">Password</label>
                </div>

                <div class="row mb-4">
                  <div class="col d-flex justify-content-center">
                    <div class="form-check">
                      <input 
                      class="form-check-input"
                       type="checkbox" 
                       value="" 
                       id="form2Example31" checked />

                      <label class="form-check-label" for="form2Example31"> Remember me </label>
                    </div>
                  </div>
                </div>
                <button 
                type="submit" 
                class="btn btn-primary btn-block mb-4"
                onClick={userAuthentication}>
                Sign in
                </button>
                <div class="text-center">
                  <p>Not a member? <a href="#!">Register</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login
