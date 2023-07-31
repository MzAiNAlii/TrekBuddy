import "./Signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";

let UserSignup = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "", 
    dateOfBirth: "",
    gender: "",
    role: "",
    contactNumber: "",
  });

  return (
    <>
      <form className="account_Container">
        <p>
          Already Have an account? <Link to="/login" id="login">Login</Link>
        </p>
        <div className="ContentBorder">
          <h2 className="Title">Sign Up</h2>
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              name="userName"
              value={userData.userName}
              type="text"
              id="userName"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              value={userData.email}
              type="email"
              id="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              value={userData.password}
              type="password"
              id="password"
              required
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              name="dateOfBirth"
              value={userData.dateOfBirth}
              type="date"
              id="dateOfBirth"
              required
            />
          </div>

          <div>
            <label>Gender:</label>
            <input
              name="gender"
              value="male"
              type="radio"
              id="genderMale"
              required
            />
            <label htmlFor="genderMale">Male</label>
            <input
              name="gender"
              value="female"
              type="radio"
              id="genderFemale"
              required
            />
            <label htmlFor="genderFemale">Female</label>
          </div>

          <div>
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" value={userData.role} required>
              <option value="admin">Admin</option>
              <option value="vendor">Vendor</option>
              <option value="user">User</option>
            </select>
          </div>

          <div>
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              name="contactNumber"
              value={userData.contactNumber}
              type="tel"
              id="contactNumber"
              pattern="[0-9]*"
              required
            />
          </div>

          <div className="button_container">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserSignup;
