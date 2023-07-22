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
  <div>
  <Link  className="signup" to="/signup">SignUP</Link>
  </div>
  <div>
  <Link  className="login" to="/login">Login</Link>
  </div>
  </div>
  </div>
</nav>
 )
}
export default NavBar