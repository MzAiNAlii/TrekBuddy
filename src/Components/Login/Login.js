import "./Login.css"
import { Link } from "react-router-dom"

let Login = () => {
    return( <>
        <form className="Container">
        <div className="ContentBorder">
            <h1  className="Title">Login</h1>
            <div>
        <label htmlFor="userName">Username:</label>
        <input type="text" id="userName" required/>
        </div>    
     
     <div>
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" required/>
    </div>

    <Link to ="/OTP"><div><button type="button" className="Forget_password" >Forgot Password</button></div></Link>
        
    <div>
    <label htmlFor="role">Role:</label>
    <select id="role" name="role" required>
      <option value="admin">Admin</option>
      <option value="vendor">Vendor</option>
      <option value="user">User</option>
    </select>
    </div>

     <div className="button_container">
    <button className="button"> Submit</button>
    </div>
    </div>
</form>
    </>
    )
}

export default Login