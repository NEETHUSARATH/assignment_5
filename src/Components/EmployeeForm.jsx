import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import { adddata } from './context/context';
import { NavLink, useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
    const{employeeData,setemployeeData} =useContext(adddata);
    const navigate =useNavigate();
    const[inputVal,setinputVal] = useState({
        name:"",
        designation:"",
        place:"",
        salary:""

    })
    const setData = (e) => {
        console.log(e.target.value)
        const {name,value}=e.target;
        setinputVal((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }
    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, designation,place,salary } = inputVal;

        const res = await fetch("http://localhost:3005/api/employeelist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, designation,place,salary
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            navigate.push("/admin")
            setemployeeData(data)
            console.log("data added");

        }
    }

  return (
    <div>
        <Navbar/>
        <div className="container " style={{marginTop: "150px", backgroundColor: "#C8C2C1"}}>
            <h3 style={{textAlign:"center"}}>Employee Registration Form</h3>
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row g-3">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">NAME</label>
                                <input value={inputVal.name} onChange={setData} type="text" className="form-control" placeholder='Enter your name'/>
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">DESIGNATION</label>
                                <input value={inputVal.designation} onChange={setData} type="text" className="form-control" />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">PLACE</label>
                                <input value={inputVal.place} onChange={setData} type="text" className="form-control" />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">SALARY</label>
                                <input value={inputVal.salary} onChange={setData} type="text" className="form-control" />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button className="btn" onClick={addinpdata} style={{backgroundColor: "#5D6D7E "}}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeForm
