import { getDefaultNormalizer } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom';
import { adddata,deldata,updatedata} from './context/context';

  

const AdminDashbrd = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      getAllUser();
    }, []);
  
    const getAllUser = () => {
      fetch("http://localhost:3005/getAllUser", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          setData(data.data);
        });
    };

    const [getuserdata, setGetuserdata] = useState([]);
    console.log(getuserdata);

    const { userdata, setUserdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);

    const getdata = async () => {

        const res =  axios.get('http://localhost:3005/api/employeelist');

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setGetuserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    
    const deleteuser = async (id) => {

        const res2 =  axios.get(`http://localhost:3005/api/employeelist${id}`)

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }

    }


    return (

        <>
            {
                userdata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{userdata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/form" className="btn btn-primary">Add data</NavLink>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">NAME</th>
                                <th scope="col">DESIGNATION</th>
                                <th scope="col">PLACE</th>
                                <th scope="col">SALARY</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.designation}</td>
                                                <td>{element.place}</td>
                                                <td>{element.salary}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/`}> <button className="btn btn-success">View</button></NavLink>
                                                    <NavLink to={`form/`}>  <button className="btn btn-primary">Add</button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    )
}

export default AdminDashbrd
