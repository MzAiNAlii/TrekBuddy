import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import '.././Style.css';

const ResetPassword = () => {

  const [passwordSuccess, setPasswordSuccess] = useState(false)
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
    e.preventDefault();
    setLoadingStates(true);
    const userId = localStorage.getItem("id");
    
    try {
      const res = await axios.post('http://localhost:4000/resetPassword', {
        newPassword: AccountData.newPassword,
        confirmPassword: AccountData.confirmPassword,
        userId: userId,
      });
  
      toast.success(res.data.message);
      setPasswordSuccess(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingStates(false);
    }
  };
  

  if (passwordSuccess) {
    return <Navigate replace to="/" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div style={{ backgroundColor: '#d7eaa8', margin: '10% 30%', padding: '5%' }} className="card">
      <h2>Set a New Password</h2>
      <div className="fxt-form">
        <form onSubmit={handleSubmit}  >

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

export default ResetPassword