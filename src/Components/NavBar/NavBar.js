import "./NavBar.css"
import React from "react"
import {Link} from "react-router-dom";

let NavBar = () => {
 return(
    <nav>
  <div className="nav_container">

  <div>
  <Link  to="/" className="nav_logo">Trek Buddy</Link>
  </div>

  <div className="nav_items">
  <div>
  <Link  id = "text" to="/">Home</Link> 
  </div>
  <div>
  <Link id = "text" to="/Destinations">Destinations</Link>
  </div>
  </div>

  <div className="nav_btn">

  <div className="dropdown">
  <Link  className="signup" to="/signup"><i class="fa fa-fw fa-user"></i>SignUP</Link>
  <div className="dropdown-content">
    <Link to="/UserSignUP">User</Link>
    <Link to="/VendorSignUP">Vendor</Link>
  </div>
  </div>
  </div>
  </div>
</nav>
 )
}
export default NavBar