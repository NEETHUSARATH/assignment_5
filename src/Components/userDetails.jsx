import React, { Component, useEffect, useState } from "react";
import AdminDashbrd from "./AdminDashbrd";
import UserDashbrd from "./UserDashbrd";


const UserDetails = () => {

    const [userData, setUserData] = useState("");
    const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3005/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);

  return admin ? <AdminDashbrd /> : <UserDashbrd userData={userData} />;
  
}

export default UserDetails