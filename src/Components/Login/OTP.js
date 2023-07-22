import "./OTP.css"
import { Link } from "react-router-dom"
let OTP = () =>{
    return(<>
    <form className="OTP_Form">
        <div>
        <div>
        <label>Enter OTP Code</label>
        </div>
        <div>
        <input/>
        </div>
        </div>
        <Link to="/Login">
        <div>
            <button id= "back-btn">OK</button>
        </div>
        </Link>
    </form>
    </>)
}

export default OTP