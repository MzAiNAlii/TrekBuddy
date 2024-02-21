import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '.././Style.css';

const SendOTP = () => {
  const [email, setEmail] = useState('');
  const [loadingStates, setLoadingStates] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingStates(true);
    try {
      const res = await axios.post('http://localhost:4000/send-otp' , {email});
      toast.success(res.message);
      localStorage.setItem('Email', email);
      setIsSuccess(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingStates(false);
    }
  };

  if (isSuccess) {
    return <Navigate replace to="/verifyOTP" />;
  }

  return (
    <div style={{ backgroundColor: '#d7eaa8', margin: '10% 30%', padding: '5%' }} className="card">
      <h1 className="mb-2">Forgot Password</h1>
      <div className="mb-3">
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <span>We’ll send a verification code to this email if it matches an existing account.</span>
      </div>

      <button type="submit" className="btn button mt-3 form-control" onClick={handleSubmit}>
        {loadingStates ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          ''
        )}
        Send
      </button>
      <Link to="/">
        <div>
          <button type="button" className="button btn mt-3">
            Back
          </button>
        </div>
      </Link>
    </div>
  );
};

export default SendOTP;
