import React from 'react'

const Navbar2 = () => {
  return (
    <div>
    <nav class="navbar  navbar-expand-lg bg-dark sticky-top  navbar-dark">
       <div class="container-fluid">
           <a class="navbar-brand" href="/home" style={{marginLeft: "30px"}}>UserDashboard</a>
           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
           </button>
           <div class="collapse navbar-collapse" id="navbarNav">
               <ul class="navbar-nav" style={{marginLeft: "800px"}}>
                   <li class="nav-item">
                    <a class="nav-link" href="/user">Home</a>
                   </li>
                   
               </ul>
           </div>
       </div>
  </nav>
</div>
  )
}

export default Navbar2
