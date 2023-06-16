import { Router } from "express";
import vendorSignupController from "../../../controllers/app/vendor/signup";
import vendorLoginController from "../../../controllers/app/vendor/login";
import vendorLogoutController from "../../../controllers/app/vendor/logout";
import vendorForgotPassword from "../../../controllers/app/vendor/forgetPassword";

const vendorrouter = Router();

vendorrouter.post("/vendorsignup",vendorSignupController)
vendorrouter.post("/vendorlogin",vendorLoginController),
vendorrouter.post("/vendorlogout",vendorLogoutController)
vendorrouter.post("/forgetpassword",vendorForgotPassword)

export default vendorrouter;