import { Router } from "express";
import adminSignupController from "../../controllers/auth/admin/signup";
import adminLoginController from "../../controllers/auth/admin/login";


const adminrouter = Router();

adminrouter.post("/adminsignup",adminSignupController)
adminrouter.post("/adminlogin",adminLoginController)

export default adminrouter;