import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();

    const logout = () => {
        localStorage.clear();
        props.showAlert(" Logged Out Successfully", "success");
    }

    return (

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
  <Link className="navbar-brand" to="/">Yoga Classes</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
                            {localStorage.getItem('token') && <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>}
                        </li>
                        <li className="nav-item">
                            {localStorage.getItem('token') && <Link className={`nav-link ${location.pathname === "/user" ? "active" : ""}`} aria-current="page" to="/user">User</Link>}
                        </li>
       
      </ul>
      {!localStorage.getItem('token') ? <form className="dflex">
                        <div class="me-2">
                        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign up</Link> </div>
                    </form> : <form className="dflex">
                    <div class="me-2">
                        <Link className="btn btn-primary mx-2" to="/login" role="button" onClick={logout}>Logout</Link> </div> </form> }
                
      
    </div>
  </div>
</nav>
    )
}

export default Navbar