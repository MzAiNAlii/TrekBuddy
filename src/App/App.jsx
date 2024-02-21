import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyOTP from '../Pages/OTP/VerifyOTP';
import ResetPassword from '../Pages/OTP/ResetPassword';
import SendOTP from '../Pages/OTP/SendOTP';
import Login from "../Pages/Login/Login"
import "./App.css"
import Dashboard from "../Components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/sendOTP" element={<SendOTP />}></Route>
            <Route path="/verifyOTP" element={<VerifyOTP />}></Route>
            <Route path="/resetPassword" element={<ResetPassword />}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
