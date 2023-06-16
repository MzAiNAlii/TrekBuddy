import { Router } from "express";
import adminSignupController from "../../controllers/admin/signup";
import adminLoginController from "../../controllers/admin/login";


const adminrouter = Router();

adminrouter.post("/adminsignup",adminSignupController)
adminrouter.post("/adminlogin",adminLoginController)

export default adminrouter;