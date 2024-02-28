import React, { useState } from 'react';
import { Navigate, Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import ".././Style.css"

const VerifyOTP = () => {
  const [loadingStates, setLoadingStates] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingStates(true);
    const userId = localStorage.getItem("id");
    try {
      const res = await axios.post('http://localhost:4000/verify-otp', { otp, userId });
      toast.success(res.data.message);
      setIsVerified(true);
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setLoadingStates(false);
    }
  };


  if (isVerified) {
    return <Navigate replace to="/resetPassword" />;
  }



  const handleResend = async () => {
    setLoadingStates(true);
    try {
      const Email = localStorage.getItem('Email')
      const res = await axios.post('http://localhost:4000/resend-otp', { Email });
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingStates(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#d7eaa8', margin: '10% 30%', padding: '5%' }} className="card">
      <h2 className=' mb-3'>Enter the 6-digit code</h2>
      <span >Check  for a verification code </span>
      <div >
        <input
          type="text"
          className="mt-3 form-control"
          id="confirmOTP"
          placeholder='Enter Verification Code Here'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: "space-between" }}>
        <button type="button" className="button btn mt-3" onClick={handleResend}>
          {loadingStates ? (
            <div class="spinner-border loader" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            ""
          )}
          Resend Code
        </button>

        <Link to="/sendOTP">
          <div>
            <button type="button" className="button btn mt-3">
              Back
            </button>
          </div>
        </Link>
      </div>


      <button type="submit" className="button btn mt-4 mb-3 form-control" onClick={handleSubmit}>
        {loadingStates ? (
          <div class="spinner-border loader" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          ""
        )}
        Verify Code
      </button>

      <span>If you don't see a code in your inbox, check your spam folder. If it's not there, the email address may not be confirmed, or it may not match an existing account.</span>

    </div>
  );
};

export default VerifyOTP;
