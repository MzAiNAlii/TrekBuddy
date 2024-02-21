import React, { useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import ".././Style.css"

const ResetPassword = () => {

 const [passwordSuccess , setPasswordSuccess] = useState(false)
  const [loadingStates, setLoadingStates] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [AccountData, setAccountData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...AccountData, [name]: value });
  }

  const handleSubmit = async (e) => {
    const userId = localStorage.getItem("userId");
    e.preventDefault();
    setLoadingStates(true);
  };
  

  if(passwordSuccess){
    return <Navigate replace to="/userlogin" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='OTPCard'>
      <h2>Set a New Password</h2>
      <div className="fxt-form">
        <form onSubmit={handleSubmit}  >

          <div className="eye-icon">
            <input
              name="newPassword"
              type={showPassword ? "text" : "password"}
              className="form-control mb-3 "
              placeholder="New Password"
              required
              value={AccountData.newPassword}
              onChange={handleInputChange}
            />
            <i
              onClick={togglePasswordVisibility}
              className={`fa fa-fw ${showPassword ? "fa-eye" : "fa-eye-slash"
                }`}
            ></i>
          </div>

          <div className="eye-icon">
            <input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              className="form-control mb-3"
              placeholder="confirmPassword"
              required
              autoComplete="Confirmpassword"
              value={AccountData.confirmPassword}
              onChange={handleInputChange}
            />
            <i
              onClick={togglePasswordVisibility}
              className={`fa fa-fw ${showPassword ? "fa-eye" : "fa-eye-slash"
                }`}
            ></i>
          </div>

          <div className="form-group">
            <button type="submit" className="OTPbtn btn" >
            {loadingStates ? (
                 <div class="spinner-border text-light" role="status">
                 <span class="visually-hidden">Loading...</span>
               </div>
                ) : (
                  ""
                )}
                Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword