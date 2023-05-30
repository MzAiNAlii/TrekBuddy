import { Router } from "express";
import vendorSignupController from "../../controllers/auth/vendor/signup";
import vendorLoginController from "../../controllers/auth/vendor/login";
import vendorLogoutController from "../../controllers/auth/vendor/logout";
import vendorForgotPassword from "../../controllers/auth/vendor/forgetPassword";

const vendorrouter = Router();

vendorrouter.post("/vendorsignup",vendorSignupController)
vendorrouter.post("/vendorlogin",vendorLoginController),
vendorrouter.post("/vendorlogout",vendorLogoutController)
vendorrouter.post("/forgetpassword",vendorForgotPassword)

export default vendorrouter;