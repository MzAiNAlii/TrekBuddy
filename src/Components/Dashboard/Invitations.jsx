import React, { useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Style.css"

const SendInvitation = () => {

  const [loadingStates, setLoadingStates] = useState(false);
  const [AccountData, setAccountData] = useState({
    email:"",
    name: "",
    userType: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...AccountData, [name]: value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingStates(true);
    try {
      const res = await axios.post("http://localhost:4000/send-invitation", AccountData);
      setAccountData({
        email:"",
        name: "",
        userType: ""
      });
      console.log(res , "Response")
    } catch (error) {
      toast.success("invitation send successfully!")
      setAccountData({
        email:"",
        name: "",
        userType: ""
      });
    } finally {
      setLoadingStates(false);
    }
  };
  

  return (
    <div className='Form_Container'>
      <h2 className="Title">Send Invitation</h2>
      <div className="fxt-form">
        <form onSubmit={handleSubmit}  >

        <div >
            <input
              name="email"
              className="form-control mb-3 "
              placeholder="Email"
              required
              value={AccountData.email}
              onChange={handleInputChange}
            />
          </div>

          <div >
            <input
              name="name"
              className="form-control mb-3 "
              placeholder="Name"
              required
              value={AccountData.name}
              onChange={handleInputChange}
            />
          </div>

          <div >
            <input
              name="userType"
              className="form-control mb-3 "
              placeholder="user Type"
              required
              value={AccountData.userType}
              onChange={handleInputChange}
            />
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
                Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SendInvitation