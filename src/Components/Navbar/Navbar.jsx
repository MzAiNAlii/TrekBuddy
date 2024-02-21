import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import  Placeholder from "../../Assets/placeholder.png"
import "./Navbar.css"

let NavBar = () => {

    const navigate = useNavigate();

    const clickHandler = async () => {
        localStorage.clear()
        const updatedToken = localStorage.getItem("token");
        if (!updatedToken) {
            navigate('/', { replace: true });
            toast.success("You have been Logged out");
        }
    };


    return (
        <nav className="Nav">
            <div className="dropdown">
                    <button className="btn" onClick={clickHandler}><i class='bx bx-log-out-circle' ></i> Logout</button>
            </div>
        </nav>
    )
}
export default NavBar