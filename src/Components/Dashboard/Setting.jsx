import React, { useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Style.css"

const SetPassword = () => {

  const [loadingStates, setLoadingStates] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [AccountData, setAccountData] = useState({
    email:"",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...AccountData, [name]: value });
  }

  const token = localStorage.getItem("Token")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingStates(true);
    try {
      const res = await axios.post("http://localhost:4000/setPassword", AccountData , token);
      toast.success(res.message)
      setAccountData({
        email: "",
        confirmPassword : "",
        password: "",
      });
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingStates(false);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='Form_Container'>
      <h2 className="Title">Set New Password</h2>
      <div className="fxt-form">
        <form onSubmit={handleSubmit}  >

        <div className="input-with-icon">
            <input
              name="email"
              className="form-control mb-3 "
              placeholder="Email"
              required
              value={AccountData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-with-icon">
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

          <div className="input-with-icon">
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
            <button type="submit" className="button btn" >
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

export default SetPassword