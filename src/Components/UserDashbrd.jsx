import { getDefaultNormalizer } from '@testing-library/react';
import axios from 'axios';
import { response } from 'express';
import React, { useEffect, useState } from 'react'
import Navbar2 from './Navbar2'

const UserDashbrd = () => {

    var [employeeData,setemployeeData] = useState([]);
    useEffect(
        ()=>{
            getData();
        },[]
    )

    const getData = ()=>{
        axios.get('http://localhost:3005/api/employeelist')
        .then(
            (response)=>{
                setemployeeData(response.data);
            }
        )
        .catch(
            (error)=>{
                console.log("Error while loading"+error);
            }
        )
    }

  return (
    <div>
      <div className="container" style={{marginTop: "30px"}} >
        <Navbar2/>
        <div className="row g-3">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <table class="table">
                    <thead>
                        <tr>
                         
                            <th scope="col">NAME</th>
                            <th scope="col">DESIGNATION</th>
                            <th scope="col">PLACE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.map(
                            (value,index)=>{
                             return <tr>
                               
                                <td >{value.name}</td>
                                <td >{value.designation}</td>
                                <td >{value.place}</td>
                            </tr> 
                            }
                        )}
                    </tbody>
                </table>

            </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashbrd({ userData })
