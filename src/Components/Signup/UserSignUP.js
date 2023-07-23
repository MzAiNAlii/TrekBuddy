import "./Signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";

let UserSignup = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "", // Corrected to lowercase "password"
    dateOfBirth: "",
    gender: "",
    role: "",
    contactNumber: "",
  });

  const postUserData = (event) => {
    const { name, value } = event.target; // Destructure name and value directly
    setUserData({ ...userData, [name]: value });
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { userName, email, password, dateOfBirth, gender, role, contactNumber } = userData;

    if (userName && email && password && dateOfBirth && gender && role && contactNumber) {
      const res = await fetch(
        "https://trekbuddy-4a266-default-rtdb.firebaseio.com/userDataRecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            email,
            password, // Corrected to lowercase "password"
            dateOfBirth,
            gender,
            role,
            contactNumber,
          }),
        }
      );

      if (res) {
        setUserData({
          userName: "",
          email: "",
          password: "", // Corrected to lowercase "password"
          dateOfBirth: "",
          gender: "",
          role: "",
          contactNumber: "",
        });
        alert("Data Stored");
      } else {
        alert("Please fill in the data");
      }
    } else {
      alert("Please fill in the data");
    }
  };

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
              onChange={postUserData}
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
              onChange={postUserData}
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
              onChange={postUserData}
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
              onChange={postUserData}
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
              onChange={postUserData}
              type="radio"
              id="genderMale"
              required
            />
            <label htmlFor="genderMale">Male</label>
            <input
              name="gender"
              value="female"
              onChange={postUserData}
              type="radio"
              id="genderFemale"
              required
            />
            <label htmlFor="genderFemale">Female</label>
          </div>

          <div>
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" onChange={postUserData} required>
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
              onChange={postUserData}
              type="tel"
              id="contactNumber"
              pattern="[0-9]*"
              required
            />
          </div>

          <div className="button_container">
            <button onClick={submitData}>Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserSignup;
