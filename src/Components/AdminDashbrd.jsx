import { getDefaultNormalizer } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const AdminDashbrd = () => {

    var [employeeData,setemployeeData] = useState([]);
    useEffect(
        ()=>{
            getData();
        },[]
    )
    const getData = ()=>{
        axios.get('ttps://jsonplaceholder.typicode.com/users')
        .then(
            (response)=>{
                setemployeeData(response.data);
            }
        )
        .catch(
            (error)=>{
                console.log("Error while loading data"+error);
            }
        )
    }

  return (
    <div>
      <div className="container" style={{marginTop: "30px"}}>
        <Navbar/>
        <div className="row g-3">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope='col'>Edit/Delete</th>
                             </tr>
                         </thead>
                         <tbody>
                             {employeeData.map(
                             (value,index)=>{
                             return <tr>
                                 <td>{value.id}</td>
                                 <td >{value.name}</td>
                                 <td >{value.email}</td>
                                 <button className="btn" style={{backgroundColor: "#5D6D7E ", marginRight:"3px",marginTop:"3px"}}>Edit</button>
                                 <button className="btn" style={{backgroundColor: "#5D6D7E ", marginLeft:"3px",marginBottom:"3px"}}>Delete</button>

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

export default AdminDashbrd
