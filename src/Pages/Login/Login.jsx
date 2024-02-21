import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import ".././Style.css"
import { toast } from "react-toastify";

const Login = () => {
  const [loadingStates, setLoadingStates] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
  }, [loadingStates]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingStates(true);

    try {
      const res = await axios.post("http://localhost:4000/admin-login", userData);
      toast.success(res.message)
      setIsUserAuthenticated(true);
      localStorage.setItem("loginId", res.data.data._id);
      localStorage.setItem("token", res.data.token)
      setUserData({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingStates(false);
    }
  };

  const id = localStorage.getItem("loginId")
  console.log("id" ,id)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isUserAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <>
      <form className="Login_Container" onSubmit={handleSubmit}>
        <h2 className="Title">Welcome Back!</h2>
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            className="form-control"
            name="email"
            placeholder="email"
            value={userData.email}
            type="email"
            id="email"
            required
            onChange={handleInputChange}
          />
        </div>

        <div className="input-with-icon mb-3">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="form-control"
            name="password"
            placeholder="Password"
            required="required"
            autoComplete="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          <i
            onClick={togglePasswordVisibility}
            className={`fa fa-fw ${showPassword ? "fa-eye" : "fa-eye-slash"
              }  field-icon`}
          ></i>
        </div>

        <Link to="/sendOTP">
          <div>
            <button type="button" className="Forget_password">
              Forgot Password?
            </button>
          </div>
        </Link>
        <button type="submit" className="button btn">
          {loadingStates ? (
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            ""
          )}
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
