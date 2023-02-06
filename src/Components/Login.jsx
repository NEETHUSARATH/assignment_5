import axios from 'axios';
import { response } from 'express';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate= useNavigate();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState();

  const userAuthentication =()=>{
    const userData={
      "email":email,
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

        navigate("./userDetails")
        
      }
      else{
        alert("invalid user");
      }
    })
  }


  return (
    <div className="auth-wrapper">
    <div className="auth-inner">
      <form onSubmit={userAuthentication}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="/sign-up">Sign Up</a>
        </p>
      </form>
    </div>
  </div>
  )
}

export default Login
